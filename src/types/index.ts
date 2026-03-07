export interface FamilyMember {
  id: string;
  user_id: string;
  name: string;
  created_at: string;
  photos?: FamilyMemberPhoto[];
}

export interface FamilyMemberPhoto {
  id: string;
  family_member_id: string;
  photo_url: string;
  created_at: string;
}

export interface IdentifyResult {
  name: string;
  confidence: number;
  explanation: string;
}
