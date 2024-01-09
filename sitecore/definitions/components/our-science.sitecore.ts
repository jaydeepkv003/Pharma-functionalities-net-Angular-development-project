import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the our-science component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'OurScience',
    icon: SitecoreIcon.DocumentTag,
    placeholders: ['phOurScience'],
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'blocklist', type: 'MultiList', source: `/sitecore/content/Sandbox/phrjss/Components/corporate-science-blocks`, },
    ],
  });
}
