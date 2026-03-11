const fs = require('fs');

function replaceDto() {
    const p = 'src/domain/evaluation/dto/create-evaluation.dto.ts';
    let content = fs.readFileSync(p, 'utf8');
    const regex = /@IsInt\(\)[\s\S]*?@Min\(1\)[\s\S]*?@Max\(5\)[\s\S]*?@IsPositive\(\)\s*(q(?:0[1-9]|[1-3][0-9]|4[0-7])): number;/g;

    // Test if match works
    const count = (content.match(regex) || []).length;
    console.log('DTO matches:', count);

    content = content.replace(regex, '@IsString()\n\t@Length(1, 1)\n\t$1: string;');
    fs.writeFileSync(p, content);
}

function replaceEntity() {
    const p = 'src/domain/evaluation/entities/evaluation.entity.ts';
    let content = fs.readFileSync(p, 'utf8');
    const regex = /@Column\(\{ type: 'smallint', nullable: false \}\)\s*(q(?:0[1-9]|[1-3][0-9]|4[0-7])): number;/g;

    const count = (content.match(regex) || []).length;
    console.log('Entity matches:', count);

    content = content.replace(regex, "@Column({ type: 'varchar', length: 1, nullable: false })\n    $1: string;");
    fs.writeFileSync(p, content);
}

replaceDto();
replaceEntity();
