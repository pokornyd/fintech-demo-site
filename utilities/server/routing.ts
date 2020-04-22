import { compile } from 'path-to-regexp';
import {
  matchPath as routerMatchPath,
  RouteProps,
} from 'react-router';

export function buildPath<TRouteParams = IDictionary<string>>(route: string, params: TRouteParams): string {
  return compile(route)(params as any as object);
}

const isRouteProps = (param: RouteProps | string): param is RouteProps => (typeof param) !== 'string';

export function matchPath<T = IDictionary<string>>(pathname: string, param: RouteProps | string): T | null {
  const matchParams = isRouteProps(param) ? param : { path: param };
  const match = routerMatchPath<T>(pathname, matchParams);
  return match && match.params;
}


export function getPathWithReplacedParameters<RouteParams extends object>(
  routePattern: string,
  pathname: string,
  parametersToBeReplaced: Partial<RouteParams>,
): string {
  const match = matchPath<RouteParams>(pathname, routePattern);
  if (!match) {
    throw Error(`Current route does not belongs to ${routePattern}`);
  }

  const partToReplace = buildPath<RouteParams>(routePattern, match);

  const newParams = Object.assign<{}, RouteParams, Partial<RouteParams>>({}, match, parametersToBeReplaced);
  const replaceWithPart = buildPath<RouteParams>(routePattern, newParams);

  return pathname.replace(partToReplace, replaceWithPart);
}
