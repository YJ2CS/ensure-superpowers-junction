/**
 * Ensure Superpowers Junction Plugin
 * 
 * 在 OpenCode 启动时（skills 加载之前），
 * 检查并创建 junction 链接：
 *   ~/.config/opencode/skills/superpowers
 *     → ~/.cache/opencode/packages/superpowers@git+https_\github.com\obra\superpowers.git\node_modules\superpowers\skills
 * 
 * 如果目标目录不存在或链接已存在，则跳过。
 */

import path from 'path';
import fs from 'fs';
import os from 'os';

export default async function ensureSuperpowersJunction({ client, directory }) {
  const homeDir = os.homedir();
  
  // 目标目录（缓存中的 superpowers skills）
  const targetDir = path.join(
    homeDir,
    '.cache', 'opencode', 'packages',
    'superpowers@git+https_',
    'github.com', 'obra', 'superpowers.git',
    'node_modules', 'superpowers', 'skills'
  );
  
  // 链接路径（OpenCode skills 目录）
  const junctionPath = path.join(
    homeDir,
    '.config', 'opencode', 'skills', 'superpowers'
  );

  return {
    /**
     * config 钩子 — 在 skills 加载之前执行
     */
    config: async (config) => {
      // 1. 目标目录不存在 → 跳过
      if (!fs.existsSync(targetDir)) {
        return;
      }

      // 2. 链接已存在 → 跳过
      if (fs.existsSync(junctionPath)) {
        return;
      }

      // 3. 确保父目录存在
      const parentDir = path.dirname(junctionPath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      // 4. 创建 junction（Windows 特有，不需要管理员权限）
      try {
        fs.symlinkSync(targetDir, junctionPath, 'junction');
        console.log(`[ensure-superpowers-junction] Created junction: ${junctionPath} → ${targetDir}`);
      } catch (err) {
        console.error(`[ensure-superpowers-junction] Failed to create junction:`, err.message);
      }
    }
  };
}
