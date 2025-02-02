import { groupByQuantity } from "../utils/helpers";
import Table from "./Table";

const specialStyles = {
    margin: ".5rem 0",
    border: "1px solid",
    padding: "1rem",
    borderRadius: "1rem",
}

/* eslint-disable react/prop-types */
function PdfRoom({ room }) {
    const { roomName, roomMaterials, roomCleats, windows, notes } = room

    const blackout = roomMaterials.filter((mat) => mat.productType === "black-out")
    console.log(blackout);

    const light = roomMaterials.filter((mat) => mat.productType === "light")
    const havey = roomMaterials.filter((mat) => mat.productType === "havey")
    const hook = roomMaterials.filter((mat) => mat.productType === "hook")
    const oima = roomMaterials.filter((mat) => mat.productType === "oima")
    const rail = roomMaterials.filter((mat) => mat.productType === 'rail')
    const rod = roomMaterials.filter((mat) => mat.productType === 'rod')
    const roll = roomMaterials.filter((mat) => mat.productType === 'roll')
    const accessory = roomMaterials.filter((mat) => mat.productType === 'accessory')

    const railrDivision = groupByQuantity(rail);
    const rodDivision = groupByQuantity(rod);
    console.log(room);
    



    return (
        <div className="pdf__room breakable-section">
            <h1 className="heading-1">{roomName}</h1>
            <div className="pdf__room-details">
                <div className="pdf__room-materials">
                    <h1 className="heading-2 mb-3">Materials</h1>

                    <Table cols="8rem 40rem 15rem auto">
                        <Table.Header>
                            <div className=" heading-2">الصنف</div>
                            <div className=" heading-2">اسم المنتج</div>
                            <div className=" heading-2">الكمية</div>
                            <div className=" heading-2">نوع الخياطة</div>
                        </Table.Header>
                        <Table.StaticBody>


                            {
                                blackout.length > 0 && blackout.map((el) =>


                                    <Table.Row withBorders={true} >
                                        <div key={el.quantity} className=" heading-2">بلاك :</div>
                                        <div className=" heading-2">{el?.product || "_"}</div>
                                        <div className=" heading-2">{el?.quantity || "_"}</div>
                                        <div className=" heading-2">{el?.variation || "_"}</div>
                                    </Table.Row>
                                )
                            }
                            {
                                light.length > 0 && light.map((el) =>

                                    <Table.Row withBorders={true} >
                                        <div key={el.quantity} className=" heading-2">خفيف :</div>
                                        <div className=" heading-2">{el?.product || "_"}</div>
                                        <div className=" heading-2">{el?.quantity || "_"}</div>
                                        <div className=" heading-2">{el?.variation || "_"}</div>
                                    </Table.Row>
                                )
                                // :
                                //     <Table.Row withBorders={true} >
                                //         <div className=" heading-2">خفيف :</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //     </Table.Row>
                            }
                            {
                                havey.length > 0 && havey.map((el) =>

                                    <Table.Row withBorders={true} >
                                        <div key={el.quantity} className=" heading-2">ثقيل :</div>
                                        <div className=" heading-2">{el?.product || "_"}</div>
                                        <div className=" heading-2">{el?.quantity || "_"}</div>
                                        <div className=" heading-2">{el?.variation || "_"}</div>
                                    </Table.Row>
                                )
                                // :
                                //     <Table.Row withBorders={true} >
                                //         <div className=" heading-2">ثقيل :</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //     </Table.Row>
                            }
                            {
                                rail.length > 0 && rail.map((el) =>

                                    <Table.Row withBorders={true} >
                                        <div key={el.quantity} className=" heading-2">مجر :</div>
                                        <div className=" heading-2">{el?.product || "_"}</div>
                                        <div className=" heading-2">{el?.quantity || "_"}</div>
                                        <div className=" heading-2">{el?.variation || "_"}</div>
                                    </Table.Row>
                                )
                                // :
                                //     <Table.Row withBorders={true} >
                                //         <div className=" heading-2">مجر :</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //     </Table.Row>
                            }
                            {
                                rod.length > 0 && rod.map((el) =>

                                    <Table.Row withBorders={true} >
                                        <div key={el.quantity} className=" heading-2">مواسير :</div>
                                        <div className=" heading-2">{el?.product || "_"}</div>
                                        <div className=" heading-2">{el?.quantity || "_"}</div>
                                        <div className=" heading-2">{el?.variation || "_"}</div>
                                    </Table.Row>
                                )
                                // :
                                //     <Table.Row withBorders={true} >
                                //         <div className=" heading-2">مواسير :</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //     </Table.Row>
                            }
                            {
                                roll.length > 0 && roll.map((el) =>

                                    <Table.Row withBorders={true} >
                                        <div key={el.quantity} className=" heading-2">رول :</div>
                                        <div className=" heading-2">{el?.product || "_"}</div>
                                        <div className=" heading-2">{el?.quantity || "_"}</div>
                                        <div className=" heading-2">{el?.variation || "_"}</div>
                                    </Table.Row>
                                )
                                // :
                                //     <Table.Row withBorders={true} >
                                //         <div className=" heading-2">رول :</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //     </Table.Row>
                            }
                            {
                                hook.length > 0 && hook.map((el) =>

                                    <Table.Row withBorders={true} >
                                        <div key={el.quantity} className=" heading-2">شماعات :</div>
                                        <div className=" heading-2">{el?.product || "_"}</div>
                                        <div className=" heading-2">{el?.quantity || "_"}</div>
                                        <div className=" heading-2">{el?.variation || "_"}</div>
                                    </Table.Row>
                                )
                                // :
                                //     <Table.Row withBorders={true} >
                                //         <div className=" heading-2">شماعات :</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //     </Table.Row>
                            }
                            {
                                accessory.length > 0 && accessory.map((el) =>

                                    <Table.Row withBorders={true} >
                                        <div key={el.quantity} className=" heading-2">اكسسوار :</div>
                                        <div className=" heading-2">{el?.product || "_"}</div>
                                        <div className=" heading-2">{el?.quantity || "_"}</div>
                                        <div className=" heading-2">{el?.variation || "_"}</div>
                                    </Table.Row>
                                )
                                // :
                                //     <Table.Row withBorders={true} >
                                //         <div className=" heading-2">اكسسوار :</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //     </Table.Row>
                            }
                            {
                                oima.length > 0 && oima.map((el) =>

                                    <Table.Row withBorders={true} >
                                        <div key={el.quantity} className=" heading-2">أويمة :</div>
                                        <div className=" heading-2">{el?.product || "_"}</div>
                                        <div className=" heading-2">{el?.quantity || "_"}</div>
                                        <div className=" heading-2">{el?.variation || "_"}</div>
                                    </Table.Row>
                                )
                                // :
                                //     <Table.Row withBorders={true} >
                                //         <div className=" heading-2">أويمة :</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //         <div className=" heading-2">{"_"}</div>
                                //     </Table.Row>
                            }

                        </Table.StaticBody>
                    </Table>

                </div>
                <div className="pdf__room-windows">
                    <h1 className="heading-2 mb-3">Windows</h1>
                    <div>
                        {
                            windows.map((window) => <div className="window-details" key={'1'}>
                                <span className="window-width"> {window.width + " Cm"} <i className="window-line"></i></span>
                                <span className="window-height"> {window.height + " Cm"} <span className="window-line"></span></span>
                                <span className="window-heightType"> {window.heightType} <span className="window-line"></span></span>
                                <img src={window.src} alt="" />
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className="pdf__room-notes">
                <h1 className="heading-2 mb-3">Notes:</h1>
                <div className="fs-2">
                    {notes}
                </div>
            </div>
        </div >
    )
}

export default PdfRoom
