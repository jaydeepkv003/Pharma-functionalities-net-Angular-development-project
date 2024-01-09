import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the header component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'Header',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.RichText, standardValue:'$name' },
      { name: 'headerBanner', type: CommonFieldTypes.Image },
      { name: 'headerLogo', type: CommonFieldTypes.Image },
      { name: 'searchimage', type: CommonFieldTypes.Image },
      { name: 'profileimage', type: CommonFieldTypes.Image },
      { name: 'cartimage', type: CommonFieldTypes.Image },
      { name: 'bannerText', type: CommonFieldTypes.RichText },
      { name: 'bannerColor', type: CommonFieldTypes.SingleLineText }
    ],
  });
}
