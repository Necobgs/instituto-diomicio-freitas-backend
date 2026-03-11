const fs = require('fs');
const file = 'src/domain/evaluation/entities/evaluation.entity.ts';
let lines = fs.readFileSync(file, 'utf8').split('\n');
let newLines = [];
let found = false;
for (let i = 0; i < lines.length; i++) {
    newLines.push(lines[i]);
    if (lines[i].includes('q01: string;')) {
        found = true;
        for (let j = 2; j <= 49; j++) {
            let q = j.toString().padStart(2, '0');
            newLines.push('\r');
            newLines.push(`    @Column({ type: 'char', length: 1, nullable: true })\r`);
            newLines.push(`    @IsString()\r`);
            newLines.push(`    @Length(1, 1)\r`);
            newLines.push(`    @IsOptional()\r`);
            newLines.push(`    q${q}: string;\r`);
        }
    }
}
if (found) {
    fs.writeFileSync(file, newLines.join('\n'));
    console.log('DONE REPLACEMENT');
} else {
    console.log('q01 string not found');
}
