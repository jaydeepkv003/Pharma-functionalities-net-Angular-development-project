import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the paginator component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function (manifest: Manifest) {
  manifest.addTemplate({
    name: 'Paginator',
    id: 'Paginator',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'defaultPageSize', type: CommonFieldTypes.Number, standardValue: '25' },
      { name:'pageSizeOptions', type: CommonFieldTypes.SingleLineText, standardValue: '25,50' }
    ],
  });
}
