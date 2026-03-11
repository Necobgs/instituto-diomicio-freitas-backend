const fs = require('fs');
const file = 'src/domain/evaluation/entities/evaluation.entity.ts';
let content = fs.readFileSync(file, 'utf8');

let fields = '';
for (let i = 2; i <= 49; i++) {
    let q = i.toString().padStart(2, '0');
    fields += `\r\n\r\n    @Column({ type: 'char', length: 1, nullable: true })\r\n    @IsString()\r\n    @Length(1, 1)\r\n    @IsOptional()\r\n    q${q}: string;`;
}

let parts = content.split('q01: string;');
if (parts.length > 1) {
    // we want to place fields right after 'q01: string;' and before the next @Column
    // parts[1] is everything after 'q01: string;'
    // so we basically just insert fields at the beginning of parts[1], but carefully removing the empty lines
    let secondPart = parts[1].replace(/^[\s\r\n]*(?=@Column)/, ''); // remove spaces before the @Column of q50
    content = parts[0] + 'q01: string;' + fields + '\r\n\r\n    ' + secondPart;
    fs.writeFileSync(file, content);
    console.log('REPLACED successfully');
} else {
    console.log('q01: string; not found');
}
