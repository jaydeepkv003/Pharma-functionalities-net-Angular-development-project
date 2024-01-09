import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the workflow-tab component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'WorkflowTab',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'tabTitle', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'description', type: CommonFieldTypes.SingleLineText },
    ],
    placeholders: ['jss-sub-tabs'],
  });
}
