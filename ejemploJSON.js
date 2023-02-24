[
    {
        brand: "Samsung",
        model: "A32",
        price: 70000,
        technical: [
            {prop: "screen size", value: "6.4″, 1080 x 2400 pixels"},
            {prop: "processor", value: "Mediatek Helio G80 2GHz"},
            {prop: "ram", value: "4GB"},
            {prop: "storage", value: "128GB"},
            {prop: "camera", value: "Quad 64MP + 8MP 5MP 5MP"},
            {prop: "batery", value: "5000 mAh"}
        ],
        category: "smartphones",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum eveniet doloremque voluptatem quidem architecto? Ab eum facere quibusdam quia hic beatae atque aperiam sapiente sint quos at itaque dolorem, magni illum eius doloribus velit amet. Facilis soluta porro voluptatum, quos vel officia exercitationem sint cum, ad reprehenderit dolorum modi quis fugit deleniti earum aliquid! Rerum natus quam placeat dolorum totam tempora eligendi doloremque autem enim quod voluptates neque laboriosam explicabo, earum quo iste aliquid dolore, ipsa adipisci eum nemo, et similique hic eos. Obcaecati itaque dolorum iure! Tempore architecto tempora reiciendis. Qui magnam nisi omnis magni non eaque fugit ducimus doloremque veniam ipsa quisquam odit facilis nihil illo, harum quas cum id quidem. Aliquid dolores magni, molestiae blanditiis id aperiam, accusantium repellat provident eaque cupiditate modi autem consequatur odio veniam atque assumenda. Porro voluptas laudantium tempora sunt quis ipsum tempore earum quidem molestias eum sint tenetur, animi ipsam aliquam iusto!",
        offer: false,
        imgs: ["samsung-a32.webp","samsung-a32-2.webp"]
    },
    {
        brand: "Xiaomi",
        model: "Redmi 9A",
        price: 58000,
        technical: [
            {prop: "screen size", value: "6.53″, 720 x 1600 pixels"},
            {prop: "processor", value: "Mediatek Helio G25 2GHz (Octacore)"},
            {prop: "ram", value: "2GB"},
            {prop: "storage", value: "32GB"},
            {prop: "camera", value: "13 MP"},
            {prop: "batery", value: "5000 mAh"}
        ],
        category: "smartphones",
        description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum eveniet doloremque voluptatem quidem architecto? Ab eum facere quibusdam quia hic beatae atque aperiam sapiente sint quos at itaque dolorem, magni illum eius doloribus velit amet. Facilis soluta porro voluptatum, quos vel officia exercitationem sint cum, ad reprehenderit dolorum modi quis fugit deleniti earum aliquid! Rerum natus quam placeat dolorum totam tempora eligendi doloremque autem enim quod voluptates neque laboriosam explicabo, earum quo iste aliquid dolore, ipsa adipisci eum nemo, et similique hic eos. Obcaecati itaque dolorum iure! Tempore architecto tempora reiciendis. Qui magnam nisi omnis magni non eaque fugit ducimus doloremque veniam ipsa quisquam odit facilis nihil illo, harum quas cum id quidem. Aliquid dolores magni, molestiae blanditiis id aperiam, accusantium repellat provident eaque cupiditate modi autem consequatur odio veniam atque assumenda. Porro voluptas laudantium tempora sunt quis ipsum tempore earum quidem molestias eum sint tenetur, animi ipsam aliquam iusto!",
        offer: false,
        imgs: ["redmi-9A.png","redmi-9A.webp"]
    }
]


db.products.updateOne({brand: "Samsung"}, {$set:{imgs: ["samsung-a32.webp","samsung-a32-2.webp"]}})
db.products.updateOne({brand: "Xiaomi"}, {$set:{imgs: ["redmi-9A.png","redmi-9A.webp"]}})