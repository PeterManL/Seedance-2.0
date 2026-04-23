import { Material, Project } from '../types';

export const mockMaterials: Material[] = [
  {
    material_id: 'mat_role_001',
    material_type: 'role',
    material_name: '林萧 (男主角)',
    material_tag: ['主角', '修仙', '青年', '冷酷'],
    description: '白衣剑客，剑眉星目，长发及腰，身着素色长袍',
    user_id: 'user_123',
    project_bind_list: ['proj_001'],
    base_image_url: 'https://images.unsplash.com/photo-1542996966-2e31c00ae7eb?auto=format&fit=crop&q=80&w=400&h=400',
    thumbnail_url: 'https://images.unsplash.com/photo-1542996966-2e31c00ae7eb?auto=format&fit=crop&q=80&w=200&h=200',
    seed: '84729103',
    positive_prompt: 'masterpiece, best quality, 1boy, handsome, long black hair, white traditional chinese robes, serious expression, sharp eyes, wuxia, swordman',
    negative_prompt: 'worst quality, low quality, bad anatomy, bad hands, missing fingers, ugly, deformed',
    ip_adapter_weight: 0.95,
    consistency_level: 'L3',
    version: 'V1.2',
    is_locked: true,
    is_public: false,
    is_usable: true,
    create_time: '2023-11-20T10:00:00Z',
    update_time: '2023-11-21T14:30:00Z'
  },
  {
    material_id: 'mat_role_002',
    material_type: 'role',
    material_name: '苏灵 (女主角)',
    material_tag: ['主角', '修仙', '仙子', '优雅'],
    description: '青衣女子，面容清丽，神色温柔，衣袂飘飘',
    user_id: 'user_123',
    project_bind_list: ['proj_001'],
    base_image_url: 'https://images.unsplash.com/photo-1574853098555-5f93dbd5ca1f?auto=format&fit=crop&q=80&w=400&h=400',
    thumbnail_url: 'https://images.unsplash.com/photo-1574853098555-5f93dbd5ca1f?auto=format&fit=crop&q=80&w=200&h=200',
    seed: '99283711',
    positive_prompt: 'masterpiece, best quality, 1girl, beautiful, elegant, green traditional clothes, gentle smile, long floating hair, fairy',
    negative_prompt: 'worst quality, low quality, bad anatomy',
    ip_adapter_weight: 0.9,
    consistency_level: 'L3',
    version: 'V1.0',
    is_locked: false,
    is_public: false,
    is_usable: true,
    create_time: '2023-11-20T10:15:00Z',
    update_time: '2023-11-20T10:15:00Z'
  },
  {
    material_id: 'mat_scene_001',
    material_type: 'scene',
    material_name: '云岚宗主殿',
    material_tag: ['玄幻', '室内', '庄严', '仙侠'],
    description: '宏伟的修仙宗门大殿，青石地板，巨大的盘龙柱，香炉青烟缭绕',
    user_id: 'user_123',
    project_bind_list: ['proj_001'],
    base_image_url: 'https://images.unsplash.com/photo-1565152862372-680467edbbab?auto=format&fit=crop&q=80&w=400&h=300',
    thumbnail_url: 'https://images.unsplash.com/photo-1565152862372-680467edbbab?auto=format&fit=crop&q=80&w=200&h=150',
    seed: '11223344',
    positive_prompt: 'masterpiece, majestic chinese fantasy palace interior, stone floor, carved dragon pillars, incense smoke, solemn atmosphere, cinematic lighting',
    negative_prompt: 'modern, people, character, blurry, noisy',
    ip_adapter_weight: 0.8,
    consistency_level: 'L3',
    version: 'V1.0',
    is_locked: true,
    is_public: true,
    is_usable: true,
    create_time: '2023-11-19T09:00:00Z',
    update_time: '2023-11-19T09:00:00Z'
  },
  {
    material_id: 'mat_scene_002',
    material_type: 'scene',
    material_name: '落日森林',
    material_tag: ['室外', '自然', '森林', '黄昏'],
    description: '夕阳下的古老森林，参天大树，光斑碎落，神秘静谧',
    user_id: 'user_123',
    project_bind_list: [],
    base_image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400&h=300',
    thumbnail_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=200&h=150',
    seed: '55667788',
    positive_prompt: 'sunset, ancient forest, giant trees, sun shafts, mysterious, magical atmosphere, detailed nature',
    negative_prompt: 'worst quality, city, buildings, indoor',
    ip_adapter_weight: 0.85,
    consistency_level: 'L2',
    version: 'V2.1',
    is_locked: false,
    is_public: true,
    is_usable: true,
    create_time: '2023-11-18T16:20:00Z',
    update_time: '2023-11-22T11:00:00Z'
  },
  {
    material_id: 'mat_prop_001',
    material_type: 'prop',
    material_name: '青霜剑',
    material_tag: ['武器', '剑', '寒冰'],
    description: '散发着寒气的上古传说宝剑',
    user_id: 'user_123',
    project_bind_list: ['proj_001'],
    base_image_url: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=400&h=400',
    thumbnail_url: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?auto=format&fit=crop&q=80&w=200&h=200',
    seed: '334455',
    positive_prompt: 'ancient chinese sword, glowing ice blue aura, sharp icy blade, intricate hilt, fantasy weapon isolated',
    negative_prompt: 'blurry, low details',
    ip_adapter_weight: 1.0,
    consistency_level: 'L3',
    version: 'V1.0',
    is_locked: true,
    is_public: false,
    is_usable: true,
    create_time: '2023-11-21T09:30:00Z',
    update_time: '2023-11-21T09:30:00Z'
  }
];

export const mockProject: Project = {
  project_id: 'proj_001',
  project_name: '剑斩虚空 - 第一集',
  create_time: '2023-11-22T08:00:00Z',
  script_origin: '林萧走进云岚宗主殿。他拔出青霜剑，眼神冷酷。苏灵在一旁静静看着他。',
  storyboard: [
    {
      shot_id: 'shot_1',
      shot_duration: 3,
      role_desc: '林萧，白衣剑客，背影',
      scene_desc: '云岚宗主殿，大门缓缓大开',
      prop_desc: '无',
      action_desc: '走入大殿',
      caption_text: '云岚宗，终于回来了。',
      prompt_base: 'masterpiece, back view, 1boy, white robes, walking into majestic chinese palace',
      bound_materials: {
        role: 'mat_role_001',
        scene: 'mat_scene_001'
      }
    },
    {
      shot_id: 'shot_2',
      shot_duration: 2.5,
      role_desc: '林萧，正面近景，冷酷的眼神',
      scene_desc: '主殿内',
      prop_desc: '拔出青霜剑，寒气四溢',
      action_desc: '拔剑，剑指前方',
      caption_text: '今日，便做个了结。',
      prompt_base: 'masterpiece, 1boy, close up face, serious expression, holding icy sword, glowing blue aura',
      bound_materials: {
        role: 'mat_role_001',
        scene: 'mat_scene_001',
        prop: 'mat_prop_001'
      }
    },
    {
      shot_id: 'shot_3',
      shot_duration: 4,
      role_desc: '苏灵，半身像，眼神担忧',
      scene_desc: '主殿侧面，大柱子旁',
      prop_desc: '无',
      action_desc: '静静注视',
      caption_text: '师兄，切莫冲动...',
      prompt_base: 'masterpiece, 1girl, green clothes, worried expression, looking at another person, standing near carved pillar',
      bound_materials: {
        role: 'mat_role_002',
        scene: 'mat_scene_001'
      }
    }
  ],
  bind_material: {
    role_list: ['mat_role_001', 'mat_role_002'],
    scene_list: ['mat_scene_001'],
    prop_list: ['mat_prop_001']
  },
  video_config: {
    resolution: '1080P',
    frame_rate: 30,
    transition_type: 'fade',
    voice_config: {}
  },
  consistency_level: 'L3'
};
