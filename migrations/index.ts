import * as migration_20261029_071914_add_seo_settings from './20261029_071914_add_seo_settings';
import * as migration_20261106_193706_add_course_curriculum_and_instructors from './20261106_193706_add_course_curriculum_and_instructors';
import * as migration_20261106_205207_add_dynamic_course_sections from './20261106_205207_add_dynamic_course_sections';

export const migrations = [
  {
    up: migration_20261029_071914_add_seo_settings.up,
    down: migration_20261029_071914_add_seo_settings.down,
    name: '20261029_071914_add_seo_settings',
  },
  {
    up: migration_20261106_193706_add_course_curriculum_and_instructors.up,
    down: migration_20261106_193706_add_course_curriculum_and_instructors.down,
    name: '20261106_193706_add_course_curriculum_and_instructors',
  },
  {
    up: migration_20261106_205207_add_dynamic_course_sections.up,
    down: migration_20261106_205207_add_dynamic_course_sections.down,
    name: '20261106_205207_add_dynamic_course_sections'
  },
];
