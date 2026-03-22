import { IsNumber, IsOptional, IsPositive } from 'class-validator';
import { Transform } from 'class-transformer';
import { Filter } from './apply-filters';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterDto{
  
  @ApiPropertyOptional({ 
    description: 'JSON string containing filter criteria. Example: {"name":{"$like":"%2.%"}}',
    type: String 
  })
  @IsOptional()
  filter: Filter;

  @ApiPropertyOptional({ example: 1, description: 'Page number for pagination' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => {
    return Number(value);
  })
  page: number = 1;

  @ApiPropertyOptional({ example: 10, description: 'Number of items per page' })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => {
    return Number(value);
  })
  limit: number = 10;

  @ApiPropertyOptional({ description: 'Include deleted records', type: Boolean })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  withDeleted?: boolean;

  @ApiPropertyOptional({ description: 'Return only deleted records', type: Boolean })
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  onlyDeleted?: boolean;
}