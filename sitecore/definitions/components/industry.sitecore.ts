import { SitecoreIcon, Manifest } from '@sitecore-jss/sitecore-jss-manifest';

/**
 * Adds the Industry component to the disconnected manifest.
 * This function is invoked by convention (*.sitecore.ts) when `jss manifest` is run.
 */
export default function(manifest: Manifest) {
  manifest.addRouteType({
    name: 'Industry',
    icon: SitecoreIcon.DocumentTag,
    fields: [],
    inherits: ['Content']
  });

    // We're also adding a component, that we can put on our sample custom route type route.
  // This component will display the route level fields on the custom route type.
  manifest.addComponent({
    name: 'Industry',
    icon: SitecoreIcon.DocumentTag,
  });
}
