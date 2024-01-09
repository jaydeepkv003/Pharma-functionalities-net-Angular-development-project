import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the tools-splash-option component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'ToolsSplashOption',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'description', type: CommonFieldTypes.SingleLineText },
      { name: 'iconImg', type: CommonFieldTypes.Image },
      { name: 'externalLink', type: CommonFieldTypes.GeneralLink },
    ],
  });
}
