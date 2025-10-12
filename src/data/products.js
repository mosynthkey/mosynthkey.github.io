import melissaScreenshot from '@/assets/images/melissa.png';
import faStudioSetEditorScreenshot from '@/assets/images/fa-studioset-editor.png';
import volcaFm2UtilityScreenshot from '@/assets/images/volcafm2-utility.png';
import modxLivesetUtilityScreenshot from '@/assets/images/modx-liveset-utility.png';
import wavyScreenshot from '@/assets/images/wavy.png';
import wavyTopImage from '@/assets/images/Wavy/wavy_top.png';

export const products = [
  {
    id: 'wavy',
    name: 'Wavy',
    description: 'An iOS app to create cool videos from album art and music.',
    appStore: 'https://apps.apple.com/jp/app/wavy-music-video-studio/id6753092962',
    screenshot: wavyScreenshot,
    detailImage: wavyTopImage
  },
  {
    id: 'melissa',
    name: 'Melissa',
    description: 'A music player for musical instrument practice, for macOS and Windows',
    website: 'https://mosynthkey.github.io/Melissa/',
    github: 'https://github.com/mosynthkey/Melissa',
    screenshot: melissaScreenshot
  },
  {
    id: 'volcafm2-utility',
    name: 'volca fm2 utility',
    description: 'A utility for the Korg volca fm2 synthesizer.',
    github: 'https://github.com/mosynthkey/volcafm2-dx7',
    screenshot: volcaFm2UtilityScreenshot
  },
  {
    id: 'modx-liveset-utility',
    name: 'MODX Liveset Utility',
    description: 'A utility for the Yamaha MODX synthesizer.',
    github: 'https://github.com/mosynthkey/MODX_Liveset_Utility',
    screenshot: modxLivesetUtilityScreenshot
  },
  {
    id: 'fa-studioset-editor',
    name: 'Roland FA Studio Set Editor',
    description: 'An editor for Roland FA series keyboards.',
    github: 'https://github.com/mosynthkey/FA-StudioSetEditor',
    screenshot: faStudioSetEditorScreenshot
  }
];