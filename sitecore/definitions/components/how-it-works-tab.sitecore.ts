import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the how-it-works-tab component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'HowItWorksTab',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      // { name: 'heading', type: CommonFieldTypes.SingleLineText },
      { name: 'title', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
    ],
    placeholders: ['jss-sections'],
  });
}
