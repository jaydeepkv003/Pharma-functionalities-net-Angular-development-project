import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the press-release-list-control component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'PressReleaseListControl',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'year', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
    ],
  });
}
