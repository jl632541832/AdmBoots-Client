import $$ from 'cmn-utils';

export async function getPageInfo(payload) {
  //cmn-utils会为get请求拼接参数/menu/getmenus?payload
  return $$.get(
    '/v1/menus/allMenus',
    JSON.parse(JSON.stringify(payload))
  ).catch((e) => {
    //catch阻止dva全局抛错，统一由errorHandle抛错
    return { status: false };
  });
}

export async function getCascadeOptions() {
  return $$.get('/v1/menus/cascadeMenus').catch((e) => {
    return { status: false };
  });
}

export async function saveMenu(payload) {
  return $$.post('/v1/menus', payload).catch((e) => {
    return { status: false };
  });
}

export async function deleteMenu(payload) {
  return $$.del('/v1/menus', payload).catch((e) => {
    return { status: false };
  });
}

export async function updateMenu(payload) {
  const {id, data} = payload;
  return $$.put(`/v1/menus/${id}`, data).catch((e) => {
    return { status: false };
  });
}
