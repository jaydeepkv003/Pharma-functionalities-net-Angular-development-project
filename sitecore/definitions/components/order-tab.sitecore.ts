import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the order-tab component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'OrderTab',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      // { name: 'ImageOne', type: CommonFieldTypes.Image },
      // { name: 'ImageTwo', type: CommonFieldTypes.Image },
      // { name: 'ImageThree', type: CommonFieldTypes.Image },
      // { name: 'ImageFour', type: CommonFieldTypes.Image },
    ],
  });
}
