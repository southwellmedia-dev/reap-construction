export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  images: string[];
  featured: boolean;
  completionYear: string;
  duration: string;
  size: string;
  value?: string;
}

export const projects: Project[] = [
  {
    id: 'warren',
    title: 'The Warren',
    category: 'Exterior Renovation',
    description: 'We recently refreshed the exteriors at The Warren with stained wood finishes that bring warmth, texture, and elevated curb appeal to the property. Led by Reap Construction, this upgrade is part of our commitment to creating spaces residents are proud to call home.',
    images: [
      '/assets/projects/warren/1746792001987.jpg',
      '/assets/projects/warren/1746792003243.jpg',
      '/assets/projects/warren/1746792004678.jpg',
      '/assets/projects/warren/1746792005699.jpg',
      '/assets/projects/warren/1746792006715.jpg',
      '/assets/projects/warren/1746792007716.jpg',
    ],
    featured: true,
    completionYear: '2024',
    duration: '8 Weeks',
    size: '24 Units',
    value: '$450K',
  },
  {
    id: 'bryant',
    title: 'The Bryant',
    category: 'Infrastructure Improvement',
    description: 'Curb appeal starts from the ground up. Our Reap Construction team gave The Bryant a fresh new look with sealcoating and restriping — clean, polished, and ready to impress.',
    images: [
      '/assets/projects/bryant/1755615602011.jpg',
      '/assets/projects/bryant/1755615603383.jpg',
      '/assets/projects/bryant/1755615603719.jpg',
      '/assets/projects/bryant/1755615604879.jpg',
      '/assets/projects/bryant/1755615606507.jpg',
    ],
    featured: true,
    completionYear: '2024',
    duration: '4 Weeks',
    size: '32k sq ft',
    value: '$125K',
  },
  {
    id: 'calvin',
    title: 'The Calvin',
    category: 'Landscaping',
    description: 'Fresh landscaping is complete at The Calvin—led by our in-house team at Reap Construction. These upgrades are more than cosmetic—they reflect our commitment to quality, resident satisfaction, and long-term value.',
    images: [
      '/assets/projects/calvin/1750251601495.jpg',
      '/assets/projects/calvin/1750251602706.jpg',
      '/assets/projects/calvin/1750251603507.jpg',
      '/assets/projects/calvin/1750251604516.jpg',
    ],
    featured: true,
    completionYear: '2024',
    duration: '6 Weeks',
    size: '18 Units',
    value: '$280K',
  },
];