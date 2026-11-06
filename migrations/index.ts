import * as migration_20261029_071914_add_seo_settings from './20261029_071914_add_seo_settings';
import * as migration_20261106_193706_add_course_curriculum_and_instructors from './20261106_193706_add_course_curriculum_and_instructors';

export const migrations = [
  {
    up: migration_20261029_071914_add_seo_settings.up,
    down: migration_20261029_071914_add_seo_settings.down,
    name: '20261029_071914_add_seo_settings',
  },
  {
    up: migration_20261106_193706_add_course_curriculum_and_instructors.up,
    down: migration_20261106_193706_add_course_curriculum_and_instructors.down,
    name: '20261106_193706_add_course_curriculum_and_instructors'
  },
];
