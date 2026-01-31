import { FlowerType } from '@/components/ImpressionistFlower';

// Valid flower types that the ImpressionistFlower component supports
export const validFlowerTypes: FlowerType[] = [
  'iris', 'poppy', 'rose', 'wildflower', 'lavender', 'daisy'
];

// Map extended AI-generated flower types to base visual types
export const mapFlowerType = (type: string): FlowerType => {
  // First check if it's already a valid type
  if (validFlowerTypes.includes(type as FlowerType)) {
    return type as FlowerType;
  }

  // Map extended types to base types
  const typeMap: Record<string, FlowerType> = {
    'sunflower': 'daisy',
    'tulip': 'rose',
    'orchid': 'iris',
    'lily': 'lavender',
    'cherry_blossom': 'rose',
    'lotus': 'iris',
    'magnolia': 'rose',
    'peony': 'rose',
    'hibiscus': 'poppy',
    'carnation': 'rose',
    'chrysanthemum': 'daisy',
    'daffodil': 'daisy',
  };

  return typeMap[type] || 'wildflower';
};
