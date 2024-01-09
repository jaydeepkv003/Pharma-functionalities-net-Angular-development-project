import { CommonFieldTypes, SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the markup-webinar-list component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addRouteType({
    name: 'MarkupWebinarList',
    icon: SitecoreIcon.DocumentTag,
    fields: [
      { name: 'heading', type: CommonFieldTypes.SingleLineText, standardValue:'$name' },
      { name: 'featuredWebinars', type: 'MultiList', source: `/sitecore/content/Sandbox/phrjss/home/Webinars`, },
    ],
    inherits: ['Paginator']
  });
    // We're also adding a component, that we can put on our sample custom route type route.
  // This component will display the route level fields on the custom route type.
  manifest.addComponent({
    name: 'MarkupWebinarList',
    icon: SitecoreIcon.DocumentTag,
  });
}
