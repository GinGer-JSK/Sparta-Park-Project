import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ShowRegisterDto {
  @IsString()
  @IsNotEmpty({ message: '제목(Title)을 입력해주세요.' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: '설명(Description)을 입력해주세요.' })
  description: string;

  @IsString()
  @IsNotEmpty({ message: '장르(Category)를 입력해주세요.' })
  category: string;

  @IsString()
  @IsNotEmpty({ message: '지역(Location)을 입력해주세요.' })
  location: string;

  @IsInt()
  @IsNotEmpty({ message: '가격(Price)을 입력해주세요.' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: '이미지 주소(Image URL)를 입력해주세요.' })
  showImage: string;
}
