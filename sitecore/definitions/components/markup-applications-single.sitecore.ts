import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the markup-applications-single component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'MarkupApplicationsSingle',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'ImageOne', type: CommonFieldTypes.Image },
      { name: 'ImageTwo', type: CommonFieldTypes.Image },
      { name: 'ImageThree', type: CommonFieldTypes.Image },
    ],
  });
}
