export type MaterialType = 'role' | 'scene' | 'prop' | 'style';

export interface Material {
  material_id: string;
  material_type: MaterialType;
  material_name: string;
  material_tag: string[];
  description: string;
  user_id: string;
  project_bind_list: string[];
  base_image_url: string;
  thumbnail_url: string;
  feature_vector?: number[];
  seed: string;
  positive_prompt: string;
  negative_prompt: string;
  ip_adapter_weight: number;
  consistency_level: 'L1' | 'L2' | 'L3' | 'L4';
  version: string;
  parent_material_id?: string;
  is_locked: boolean;
  is_public: boolean;
  is_usable: boolean;
  create_time: string;
  update_time: string;
}

export interface Shot {
  shot_id: string;
  shot_duration: number;
  role_desc: string;
  scene_desc: string;
  prop_desc: string;
  action_desc: string;
  caption_text: string;
  prompt_base: string;
  bound_materials: {
    role?: string;
    scene?: string;
    prop?: string;
  };
}

export interface Project {
  project_id: string;
  project_name: string;
  create_time: string;
  script_origin: string;
  storyboard: Shot[];
  bind_material: {
    role_list: string[];
    scene_list: string[];
    prop_list: string[];
  };
  video_config: {
    resolution: string;
    frame_rate: number;
    transition_type: string;
    voice_config: any;
  };
  consistency_level: 'L1' | 'L2' | 'L3' | 'L4';
}
