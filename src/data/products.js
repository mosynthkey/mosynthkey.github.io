import faStudioSetEditorScreenshot from '@/assets/images/fa-studioset-editor.png';
import volcaFm2Bg from '@/assets/images/volcafm2_bg.png';
import volcaFm2Icon from '@/assets/images/volcafm2_icon.png';
import modxLivesetUtilityScreenshot from '@/assets/images/modx-liveset-utility.png';
import wavyTopImage from '@/assets/images/Wavy/wavy_top.png';
import wavyBg from '@/assets/images/wavy_bg.png';
import wavyIcon from '@/assets/images/wavy_icon.png';
import melissaBg from '@/assets/images/melissa_bg.png';
import melissaIcon from '@/assets/images/melissa_icon.png';
import screenDescBg from '@/assets/images/screendesc_bg.png';
import screenDescIcon from '@/assets/images/screendesc_icon.png';

export const products = [
  {
    id: 'wavy',
    name: 'Wavy',
    description: 'An iOS app to create cool videos from album art and music.',
    appStore: 'https://apps.apple.com/jp/app/wavy-music-video-studio/id6753092962',
    screenshot: wavyBg,
    icon: wavyIcon,
    detailImage: wavyTopImage,
    platforms: ['ios']
  },
  {
    id: 'melissa',
    name: 'Melissa',
    description: 'A music player for musical instrument practice',
    website: 'https://mosynthkey.github.io/Melissa/',
    github: 'https://github.com/mosynthkey/Melissa',
    screenshot: melissaBg,
    icon: melissaIcon,
    platforms: ['macos', 'windows']
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
    screenshot: screenDescBg,
    icon: screenDescIcon,
    platforms: ['web', 'windows', 'macos']
  },
  {
    id: 'volcafm2-tools',
    name: 'volca fm2 tools',
    description: 'A Program and Sequence editor for the KORG volca fm2 with DX7 SysEx support',
    website: 'https://mosynthkey.github.io/volcafm2-tools/',
    github: 'https://github.com/mosynthkey/volcafm2-dx7',
    screenshot: volcaFm2Bg,
    icon: volcaFm2Icon,
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
