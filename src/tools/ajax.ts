import { AjaxConfig, BaseAjax } from "../../deps.ts";

export class Ajax extends BaseAjax {
  /**
     * 处理错误请求
     */
  protected handleErrorResponse(response: Response) {
    console.error(
      `HTTP error, status = ${response.status}, statusText = ${response.statusText}`,
    );
    // if (response.status === 401) { //权限问题
    //   this.stopAjax();
    //   this.abortAll();
    //   // toLogin();
    // }
  }
}

const instance = new Ajax();

export const ajax = <T>(config: AjaxConfig) => {
  return instance.ajax<T>(config);
};

export const get = instance.get.bind(instance);
export const post = instance.post.bind(instance);
