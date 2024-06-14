import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  birthday: string;

  @ApiProperty()
  horoscope: string;

  @ApiProperty()
  zodiac: string;

  @ApiProperty()
  height: string;

  @ApiProperty()
  weight: string;

  @ApiProperty()
  interests: Array<string>;
}
