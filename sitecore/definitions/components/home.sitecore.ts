import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the home component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'Home',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'bannerContent', type: CommonFieldTypes.RichText, standardValue:'$name' },
    ],
  });
}
