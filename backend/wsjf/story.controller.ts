import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Planning } from './entities/planning.entity';

@Controller('wsjf/story')
export class StoryController {
  constructor(
    @InjectRepository(Story) private storyRepository: Repository<Story>,
    @InjectRepository(Planning) private planningRepository: Repository<Planning>
  ) {}

  @Post('')
  async saveStory(@Body() story: Story) {
    if (story.id) {
      const s = await this.storyRepository.findOneById(story.id);
      story = Object.assign(s, story);
    }
    if (story.planning) {
      const planning = await this.planningRepository.findOneById(story.planning.id);
      story.planning = planning;
    }
    console.log(story);
    return await this.storyRepository.save(story);
  }

  @Delete(':id')
  async deleteStory(@Param('id') id) {
    return await this.storyRepository.deleteById(id);
  }
}