import melissaScreenshot from '@/assets/images/melissa.png';
import faStudioSetEditorScreenshot from '@/assets/images/fa-studioset-editor.png';
import volcaFm2UtilityScreenshot from '@/assets/images/volcafm2-utility.png';
import modxLivesetUtilityScreenshot from '@/assets/images/modx-liveset-utility.png';
import wavyScreenshot from '@/assets/images/wavy.png';
import wavyTopImage from '@/assets/images/Wavy/wavy_top.png';
import screenDescScreenshot from '@/assets/images/screendesc.png';

export const products = [
  {
    id: 'wavy',
    name: 'Wavy',
    description: 'An iOS app to create cool videos from album art and music.',
    appStore: 'https://apps.apple.com/jp/app/wavy-music-video-studio/id6753092962',
    screenshot: wavyScreenshot,
    detailImage: wavyTopImage,
    platforms: ['ios']
  },
  {
    id: 'melissa',
    name: 'Melissa',
    description: 'A music player for musical instrument practice',
    website: 'https://mosynthkey.github.io/Melissa/',
    github: 'https://github.com/mosynthkey/Melissa',
    screenshot: melissaScreenshot,
    platforms: ['windows', 'macos']
  },
  {
    id: 'screen-desc',
    name: 'ScreenDesc',
    description: 'An AI-powered screenshot annotation tool for creating clear app and software guides.',
    website: 'https://mosynthkey.github.io/ScreenDesc/landing/',
    websiteByLocale: {
      ja: 'https://mosynthkey.github.io/ScreenDesc/landing/ja/',
      en: 'https://mosynthkey.github.io/ScreenDesc/landing/'
    },
    github: 'https://github.com/mosynthkey/ScreenDesc',
    screenshot: screenDescScreenshot,
    platforms: ['web', 'windows', 'macos']
  },
  {
    id: 'volcafm2-utility',
    name: 'KORG volca fm2 utility',
    description: 'Receive programs from KORG volca fm2 and save as DX7 SysEx',
    website: 'https://mosynthkey.github.io/volcafm2-dx7/',
    github: 'https://github.com/mosynthkey/volcafm2-dx7',
    screenshot: volcaFm2UtilityScreenshot,
    platforms: ['web']
  },
  {
    id: 'modx-liveset-utility',
    name: 'YAMAHA MODX Liveset Utility',
    description: 'A utility for the Yamaha MODX synthesizer.',
    website: 'https://mosynthkey.github.io/MODX_Liveset_Utility/',
    github: 'https://github.com/mosynthkey/MODX_Liveset_Utility',
    screenshot: modxLivesetUtilityScreenshot,
    platforms: ['web']
  },
  {
    id: 'fa-studioset-editor',
    name: 'Roland FA Studio Set Editor',
    description: 'A Studio Set Editor for Roland FA synthesizers.',
    website: 'https://mosynthkey.github.io/FA-StudioSetEditor/index.html',
    github: 'https://github.com/mosynthkey/FA-StudioSetEditor',
    screenshot: faStudioSetEditorScreenshot,
    platforms: ['web']
  }
];
