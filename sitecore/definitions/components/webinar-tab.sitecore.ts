import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the WebinarTab component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addComponent({
    name: 'WebinarTab',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'title', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'featuredWebinars', type: 'Multilist with Search', source: `StartSearchLocation={9285B048-DBEC-56E8-8601-0EFD18DCD4D2}&TemplateFilter={A900706D-6812-5E72-B0F4-AA513BB5A45C}`, },      
    ],
  });
}
