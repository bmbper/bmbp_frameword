use bmbp_abc::{base_ctx, BMBP_TERA};
use salvo::prelude::*;

#[handler]
pub async fn framework_index_view(_: &mut Request, resp: &mut Response) {
    let ctx = base_ctx();
    let view_html = "framework.html";
    resp.render(Text::Html(
        BMBP_TERA.read().unwrap().render(view_html, &ctx).unwrap(),
    ));
}
