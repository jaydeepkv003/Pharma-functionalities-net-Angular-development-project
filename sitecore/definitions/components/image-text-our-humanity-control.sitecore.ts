import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the ImageTextOurHumanityControl component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'ImageTextOurHumanityControl',
    icon: SitecoreIcon.DocumentTag,
    inherits: ['ImageTextTemplate'],
  });
}
