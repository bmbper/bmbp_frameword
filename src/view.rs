use bmbp_abc::{base_ctx, BMBP_TERA};
use salvo::prelude::*;

#[handler]
pub async fn framework_index_view(_: &mut Request, resp: &mut Response) {
    let mut ctx = base_ctx();
    ctx.insert("current_user", "Bmbp");
    let view_html = "bmbp_framework/framework.html";
    resp.render(Text::Html(
        BMBP_TERA.read().unwrap().render(view_html, &ctx).unwrap(),
    ));
}
