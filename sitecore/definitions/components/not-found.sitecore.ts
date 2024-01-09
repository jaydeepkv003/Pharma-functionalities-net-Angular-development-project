import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the not-found component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'NotFound',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'description', type: CommonFieldTypes.SingleLineText },
      { name: 'notFoundImg', type: CommonFieldTypes.Image },
      { name: 'usefulLinks', type: CommonFieldTypes.RichText },
    ],
  });
}
