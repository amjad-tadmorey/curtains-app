import supabase from "../services/supabase"

function Settings() {
    async function handleClick() {

        const { data } = await supabase
            .from('orders')
            .insert([
                {
                    id: 40,
                    created_at: "2024-10-27T17:41:29.64709+00:00",
                    status: "pending",
                    staticItems: [
                        {
                            code: 2,
                            oldID: "8-0888",
                            price: 133,
                            quantity: 1,
                            productName: "كابولي مجوز عادي",
                            productType: "accessory"
                        }
                    ],
                    rooms: [
                        {
                            notes: "",
                            windows: [
                                {
                                    src: "/src/assets/windows/shape-1.svg",
                                    width: "1",
                                    height: "1",
                                    imageId: 1,
                                    windowId: 0.08097552663842222,
                                    heightType: "full"
                                }
                            ],
                            roomName: "a",
                            roomCleats: [],
                            roomMaterials: [
                                {
                                    product: "كابولي مجوز عادي",
                                    quantity: "1",
                                    sewingType: "type-1",
                                    productType: "accessory"
                                }
                            ]
                        }
                    ],
                    generalInfo: {
                        sales: "abd al rahman ashmar",
                        customer: "amjad tadmory,2",
                        showRoom: "tagammo",
                        orderType: "home-delivery",
                        technical: "محمود كامل"
                    },
                    orderTotal: 133,
                    orderDate: "2024-11-3"
                },

            ])
            .select()

        return data

    }
    return (
        <div>
            Settings
            <button onClick={handleClick}>Add Product</button>
        </div>
    )
}

export default Settings
