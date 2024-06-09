import fs from 'fs'
import path from 'path'

export const readFileContents = async (folderPath) => {
    const files = []

    try {
        const folderContents = await fs.promises.readdir(folderPath)

        for (const file of folderContents) {
            const filePath = path.join(folderPath, file)
            const stats = await fs.promises.stat(filePath)

            if (stats.isFile() && path.extname(file) === '.md') {
                const content = await fs.promises.readFile(filePath, 'utf-8')
                files.push({
                    name: path.basename(file, '.md'),
                    path: filePath,
                    content
                })
            }
        }
    } catch (error) {
        console.error('Error reading files:', error)
    }

    return files
}