import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the aboutus component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'Aboutus',
    icon: SitecoreIcon.DocumentTag,
    placeholders: ['phAboutus'],    
    fields: [
      { name: 'hamburger', type: CommonFieldTypes.Image },
      { name: 'logo', type: CommonFieldTypes.Image },
      { name: 'heading', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
    ],
  });
}
