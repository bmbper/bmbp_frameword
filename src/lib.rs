mod action;
mod view;

use crate::action::root_action;
use crate::view::framework_index_view;
use bmbp_abc::tera_add_template;
use rust_embed::RustEmbed;
use salvo::serve_static::static_embed;
use salvo::Router;

#[derive(RustEmbed)]
#[folder = "static"]
struct StaticAssets;

pub fn build_router() -> Router {
    let mut router = Router::new();
    router = router.push(Router::with_path("/static/<**path>").get(static_embed::<StaticAssets>()));
    router = router.push(Router::new().get(root_action));
    router = router.push(Router::with_path("/framework.view").get(framework_index_view));

    router
}

#[derive(RustEmbed)]
#[folder = "web/templates"]
pub(crate) struct PageAssets;
pub fn build_template() {
    for file_path in PageAssets::iter() {
        tera_add_template(file_path.as_ref(), PageAssets::get(file_path.as_ref()));
    }
}
