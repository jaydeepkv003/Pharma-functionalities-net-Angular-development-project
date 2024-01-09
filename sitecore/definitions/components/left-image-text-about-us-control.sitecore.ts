import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the LeftImageTextAboutUsControl component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'LeftImageTextAboutUsControl',
    icon: SitecoreIcon.DocumentTag,
    inherits: ['ImageTextTemplate'],
  });
}
