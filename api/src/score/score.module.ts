import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScoreController } from './score.controller';
import { ScoreSchema } from './score.schema';
import { ScoreService } from './score.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Score', schema: ScoreSchema}])],
  controllers: [ScoreController],
  providers: [ScoreService]
})
export class ScoreModule {}
