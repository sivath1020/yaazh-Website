export const PAGE_PATHS = ['/', '/services', '/about', '/work', '/work/aspire-holidays', '/work/vibhu-travel', '/contact', '/careers', '/digital-marketing-company-coimbatore', '/website-development-coimbatore', '/software-development-coimbatore'];
export function resolvePageRequest(pathname) {
  if (pathname === '/index.html') return { redirect: '/' };
  const path = pathname.replace(/\/+$/, '') || '/';
  if (['/brochure', '/brochures'].includes(path)) return { redirect: '/services' };
  if (path.endsWith('.html') && PAGE_PATHS.includes(path.slice(0, -5))) return { redirect: path.slice(0, -5) };
  if (PAGE_PATHS.includes(path)) {
    if (path !== '/' && path !== pathname) return { redirect: path };
    return { file: path === '/' ? 'index.html' : `${path.slice(1)}.html`, status: 200 };
  }
  return null;
}
