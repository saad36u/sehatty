import React, { useState } from "react";
import api from "../../../client/src/api";

// ------------------ Static Data ------------------

const sampleTransfers = [
  { fullName: "محمد سامر صالح اليازجي", personId: "421297714", birthYear: "2005", mobileNo: "0592201624", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "علاء الدين زكريا إبراهيم الزميلي", personId: "403064710", birthYear: "1997", mobileNo: "0592232664", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "يوسف إيهاب رجب أبو عطايا", personId: "403024771", birthYear: "1997", mobileNo: "0599344543", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "خلف سمير خلف أبو سيدو", personId: "905335279", birthYear: "1981", mobileNo: "0597670670", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "محمد زهير زكريا ساق الله", personId: "901255489", birthYear: "1976", mobileNo: "0599757837", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "عبدالله زهير زكريا إبراهيم الزميلي", personId: "422491928", birthYear: "2005", mobileNo: "0592339692", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "احمد عبد المجيد فهمي الربيعي", personId: "802776021", birthYear: "1990", mobileNo: "0595429294", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "سامح محمد علي الطويل", personId: "903288165", birthYear: "1980", mobileNo: "0567761881", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "اياد اديب كاظم أبو شعبان", personId: "803446640", birthYear: "1992", mobileNo: "0594919999", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "محمد علاء الدين بكر احمد", personId: "404136301", birthYear: "1998", mobileNo: "0567779008", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "احمد ابراهيم سلامه الجبالي", personId: "804734739", birthYear: "1993", mobileNo: "0566007300", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "يوسف امين يوسف النزلي", personId: "801344375", birthYear: "1985", mobileNo: "0599832952", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "نضال حسن جميل بياعه", personId: "456106434", birthYear: "1983", mobileNo: "0598451315", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "محمد سليم محمد صرصور", personId: "800584344", birthYear: "1985", mobileNo: "0592500304", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "إبراهيم سفيان رضوان الريفي", personId: "408479186", birthYear: "2003", mobileNo: "0597352661", status: "تحت الإجراء", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "عمرو سليم خلف ابو سيدو", personId: "802154443", birthYear: "1988", mobileNo: "0597718871", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "ابراهيم محمد محمود ابو حطب", personId: "906726971", birthYear: "1981", mobileNo: "0599908959", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  { fullName: "تامر أسعد محمد بدوي", personId: "801872748", birthYear: "1990", mobileNo: "0567277956", status: "تحت الإجراء", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 0 },
  {fullName: "يزن ميسره خليل الصباغ", personId: "432235265", birthYear: "2012", mobileNo: "0599708996", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  {fullName: "عبد المجيد باسل ياسين قفه", personId: "803650969", birthYear: "1992", mobileNo: "0595099056", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
  {fullName: "باسل ياسين يوسف قفه", personId: "971555446", birthYear: "1960", mobileNo: "0594420318", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
{ fullName: "كرم باسل باسين قفه", personId: "804331841", birthYear: "1993", mobileNo: "0595606441", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
{ fullName: "محمد مخلص نمر عبد المجيد ابو ناجي", personId: "802552760", birthYear: "1991", mobileNo: "0599631742", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },
{ fullName: "وفاء مدحت ديب شنغان", personId: "401214150", birthYear: "1996", mobileNo: "0592680298", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 }
{ fullName: "يوسف عبدالله بركه ابو دقه", personId: "456604420", birthYear: "1945", mobileNo: "0569469462", status: "معتمد", travelStatus: 0, returnReason: "", categoryId: "1", internalStatusCode: 1 },


];



export default function SearchPage() {
  const [personId, setPersonId] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [resultHtml, setResultHtml] = useState("");
  const [showResults, setShowResults] = useState(false);

  // دالة لتكوين HTML من item مثل API بالضبط
  const buildHtmlFromItem = (item) => {
    let extraNote = "";

    if (item.travelStatus === 25 || item.TRAVEL_STATUS === 25) {
      extraNote =
        '<br><span class="text-success fw-bold">الحالة تم السفر</span>';
    } else if (item.status === "معتمد" || item.STATUS === "معتمد") {
      extraNote =
        '<br><span class="text-danger fw-bold">طلبكم "معتمد" بانتظار موافقة التنسيق ودولة مستضيفة</span>';
    }

    const fullName = item.fullName || item.FULL_NAME;
    const status = item.status || item.STATUS;
    const mobile = item.mobileNo || item.MOBILE_NO;
    const categoryId = item.categoryId || item.CATEGORY_ID;
    const returnReason = item.returnReason || item.RETURN_REASON;
    const internal = item.internalStatusCode || item.status;

    let msg = "";

    if (
      internal === 1 ||
      (internal === 2 && ["1", "2", "3"].includes(categoryId)) ||
      internal === 3
    ) {
      msg = `<b class="fs-5"> السيد/ة: ${fullName}
        <br> حالة طلبك <span class="badge badge-light-success fs-6 fw-bolder">${status}</span>
        ${extraNote}
        <br> رقم الجوال: ${mobile}
        </b>`;
    } else if (internal === 9) {
      msg = `<b class="fs-5"> السيد/ة: ${fullName}
        <br> حالة طلبك <span class="badge badge-light-success fs-6 fw-bolder">${status} (${returnReason})</span>
        <br> رقم الجوال: ${mobile}
        </b>`;
    } else {
      msg = `<b class="fs-5"> السيد/ة: ${fullName}
        <br> حالة طلبك <span class="badge badge-light-success fs-6 fw-bolder">${status}</span>
        ${extraNote}
        <br> رقم الجوال: ${mobile}
        </b>`;
    }

    return `<div class="border rounded p-3 mb-3 bg-light">${msg}</div>`;
  };

  const handleSearch = async () => {
    if (!personId) return alert("من فضلك ادخل رقم الهوية");
    if (personId.length !== 9 || isNaN(personId))
      return alert("من فضلك ادخل رقم هوية صحيح");
    if (!birthYear) return alert("من فضلك ادخل سنة الميلاد");

    // ------------------ البحث في البيانات الثابتة أولاً ------------------
    const foundLocal = sampleTransfers.filter(
      (t) => t.personId === personId && t.birthYear === birthYear
    );

    if (foundLocal.length > 0) {
      let html = "";
      foundLocal.forEach((item) => (html += buildHtmlFromItem(item)));
      const contactHtml = `
        <div class="mt-4 text-center">
        لتواصل مع إدارة التحويلات
          <a href="https://wa.me/972567277956" target="_blank" 
             class="fw-bold text-primary fs-5">
             اضغط هنا
          </a>
        </div>
      `;

      setResultHtml(html + contactHtml);
      
      setShowResults(true);
      return; // وقف — لا نحتاج API
    }

    // ------------------ API إذا لم توجد بيانات ثابتة ------------------
    try {
      const { data } = await api.get("/api/search", {
        params: {
          personid: personId,
          DOB: birthYear
        }
      });

      let htmlContent = "";

      if (data.success === 1 && data.transfers?.length > 0) {
        data.transfers.forEach((item) => {
          htmlContent += buildHtmlFromItem(item);
        });
      } else if (data.success === 2) {
        htmlContent = '<b class="fs-5">لا يوجد تحويلة عالنظام</b>';
      } else {
        htmlContent = '<b class="fs-5">يرجى التأكد من البيانات المدخلة</b>';
      }
      const contactHtml = `
        <div class="mt-4 text-center">
        لتواصل مع إدارة التحويلات
          <a href="https://wa.me/972567277956" target="_blank" 
             class="fw-bold text-primary fs-5">
             اضغط هنا
          </a>
        </div>
      `;

      setResultHtml(htmlContent + contactHtml);

      setShowResults(true);
    } catch (err) {
      console.error(err);
      setResultHtml('<b class="fs-5">حدث خطأ في الاتصال بالخادم</b>');
      setShowResults(true);
    }
  };

  return (
    <>
      <div className="card mb-5">
        <div className="card-body">
          <div className="card shadow-sm border-0 bg-light">
            <div className="card-body py-10">
              <h2 className="text-center text-primary fw-bold mb-8">
                🔎 استعلام التحويلات الطبية
              </h2>
              <form
                className="row g-4 justify-content-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
              >
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="رقم الهوية"
                    value={personId}
                    maxLength={9}
                    onChange={(e) => setPersonId(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="سنة الميلاد"
                    value={birthYear}
                    maxLength={4}
                    onChange={(e) => setBirthYear(e.target.value.replace(/\D/g, ""))}
                  />
                </div>
                <div className="col-md-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    <i className="bi bi-search"></i> بحث
                  </button>
                </div>
              </form>
            </div>
          </div>

          {showResults && (
            <div id="dv_search" className="row mt-5">
              <div className="alert alert-dismissible bg-light-primary border border-primary d-flex flex-column flex-sm-row p-5 mb-10">
                <span className="svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0">
                  {/* يمكن وضع نفس SVG الموجود في الكود الأصلي */}
                </span>
                <div className="d-flex flex-column pe-0 pe-sm-10">
                  <h4 className="mb-1 text-primary">نتائج البحث</h4>
                  <span
                    id="search_result"
                    dangerouslySetInnerHTML={{ __html: resultHtml }}
                  />
                </div>
                <button
                  type="button"
                  className="position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto"
                  onClick={() => setShowResults(false)}
                >
                  <i className="bi bi-x fs-1 text-primary"></i>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

          <div className="toast show flex-center text-center d-none" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header text-center">
              <span className="svg-icon svg-icon-2 svg-icon-primary me-3"></span>
              <strong className="me-auto text-primary fs-4">تحديثات التحويلات الطبية</strong>
              <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div className="toast-body text-dark fs-7">
              - لا داعي في المرحلة الحالية مراجعة وزارة الصحة، لا يوجد جديد على الية العمل
              <br />
            </div>
          </div>

      <div className="card shadow-sm border-0 mb-10">
        <div className="card-body py-10">
          <div className="row text-center mb-10">
            <div className="col-md-4 mb-5">
              <button id="kt_drawer_example_dismiss_button" className="btn btn-light-primary w-100 py-6">
                <i className="bi bi-question-circle fs-1 text-primary mb-2"></i><br />
                <span className="fw-bold fs-6">الأسئلة المتداولة</span>
                <small><span className="badge badge-light-warning fs-7 fw-bolder">جديد (05/11/2025)</span></small>
              </button>
            </div>

            <div className="col-md-4 mb-5">
              <a href="https://www.sehatty.ps/public/uploads/referral/referral.jpg" target="_blank" className="btn btn-light-info w-100 py-6">
                <i className="bi bi-info-circle fs-1 text-info mb-2"></i><br />
                <span className="fw-bold fs-6">إرشادات التحويلة</span>
              </a>
            </div>

            <div className="col-md-4 mb-5">
              <a href="https://www.sehatty.ps/public/followup_patients" target="_blank" className="btn btn-light-success w-100 py-6">
                <i className="bi bi-people fs-1 text-success mb-2"></i><br />
                <span className="fw-bold fs-6">متابعة مرضى التحويلات الذي تم سفرهم خارج القطاع</span>
              </a>
            </div>
          </div>

          <div id="kt_drawer_example_dismiss" className="bg-white" data-kt-drawer="true" data-kt-drawer-activate="true" data-kt-drawer-toggle="#kt_drawer_example_dismiss_button" data-kt-drawer-close="#kt_drawer_example_dismiss_close" data-kt-drawer-overlay="true" data-kt-drawer-width={{default: '300px', md: '500px'}}>
            <div className="card rounded-0 w-300">
              <div className="card-header pe-5">
                <div className="card-title">
                  <div className="d-flex justify-content-center flex-column me-3">
                    <a href="#" className="fs-4 fw-bolder text-gray-900 text-hover-primary me-1 lh-1">الأسئلة المتداولة</a>
                  </div>
                </div>
                <div className="card-toolbar">
                  <div className="btn btn-sm btn-icon btn-active-light-primary" id="kt_drawer_example_dismiss_close">
                    <span className="svg-icon svg-icon-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                        <rect opacity="0.5" x="6" y="17.3137" width="16" height="2" rx="1" transform="rotate(-45 6 17.3137)" fill="black" />
                        <rect x="7.41422" y="6" width="16" height="2" rx="1" transform="rotate(45 7.41422 6)" fill="black" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              <div className="card-body hover-scroll-overlay-y">
                <div className="d-flex flex-column me-20">
                  <ul className="list-unstyled">
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س1/ كم يستغرق الاتصال الأول لمنظمة الصحة العالمية على المريض بعد اعتماد التحويلة بوزارة الصحة؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ تقريبا من أسبوعين حتى شهور.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س2/ كم يستغرق الاتصال الثاني من منظمة الصحة العالمية للتبليغ بموعد السفر؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ يعتمد على موافقة الدولة المستضيفة والجهات الامنية من الجانب الاسرائيلي.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س3/ أود إضافة مرافقين جدد؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ عليك انتظار اتصال منظمة الصحة العالمية، قبل أسبوع من السفر سيتم التواصل معك وترتيب موضوع المرافقين.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س4/ بعد اعتماد الحالة على موقع صحتي، هل أقوم بالمراجعة في المستشفى الحكومي او مجمع ناصر؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ لا نهائيا، عليك انتظار اتصال منظمة الصحة العالمية، ومتابعة موقع صحتي، والتأكد أن رقم الجوال الظاهر على الموقع صحيح.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س5/ هل يوجد طلب استعجال؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ لا، لا يلزم.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س6/ هل تحتاج التحويلة تجديد بعد أربع شهور من تاريخ إصدارها؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ لا تحتاج، مادام التحويل من خلال منظمة الصحة العالمية.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س7/ بعد طباعة التحويلة، أرغب بتعديل المرافقين؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ سيتم الاتصال على المريض من منظمة الصحة وحينها يتم تعديل البيانات بكل سهولة، وذلك قبل السفر بأسبوع.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س8/ كم يستغرق السفر بعد استكمال الإجراءات؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ يعتمد على التنسيق للسفر ووجود دولة مستضيفة للمريض.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س9/ ماذا يعني اتصال منظمة الصحة العالمية وطلب الأوراق الطبيبة والصور الشخصية؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ أنه تم عمل ملف لك في المنظمة وتم ارساله للدول المستضيفة، وعند قبول الدولة سيتم الاتصال عليك مرة أخرى.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س10/ ما يعني كلمة معتمد على موقع صحتي؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ نتيجة معتمد تعني انه تم اعتماد التحويلة الخاصة بالمريض، وتم تحويلها لمنظمة الصحة العالمية WHO، وبانتظار القبول من دولة لاستضافة الحالة.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س11/ ما هي الفئة العمرية المسموح سفرها الان؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ فقط الأطفال الآن مسموح سفرهم أقل من 17 عام.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س12/ ما هو عدد المرافقين المسموح لهم بمرافقة المريض؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ هذا مرتبط بالدولة المستضيفة للحالة، هي من تحدد عدد ونوع المرافقين، ويتم ترتيب الامر من خلال اتصال منظمة الصحة العالمية قبل بأسبوع من السفر على المريض.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س13/ في حال حدوث تغيير على حالة المريض ما هو الاجراء؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ عليك مراجعة الطبيب المعالج، وعمل تقرير طبي بتطورات الحالة الصحية، وارفاق التقرير مع التحويلة في شباك الطباعة في المستشفى التي طبعت منها التحويلة.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س14/ هل نتيجة معتمد تعني أني مرشح للسفر؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ صحيح، وفي انتظار اتصال منظمة الصحة العالمية.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س15/ هل يوجد ترتيب أو دور أو كود؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ لا يوجد كود أو ترميز أو كشوفات أو ترتيب خاص بالتحويلة، فقط رقم الهوية والفحص على موقع صحتي هو الدليل لمعرفة هل التحويلة معتمدة أم لا.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س16/ متى سيتم السماح للبالغين بالسفر؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ الأمر يتعلق بالموافقة من الجانب الإسرائيلي، حيث أن المعبر الوحيد الفعال الان هو كرم أبو سالم ويشترط أن يكون أطفال.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س17/ هل الصليب الأحمر يشترك في اجلاء المرضى بالتعاون مع منظمة الصحة العالمية؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ لا.
                    </li>
                    <div className="separator separator-dashed border-primary opacity-25 mb-5"></div>

                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-danger"></span>
                      س18/ هل يوجد تحصيل رسوم أو بديل مادي في أي مرحلة من مراحل عمل التحويلة؟
                    </li>
                    <li className="d-flex align-items-center fs-5 py-2">
                      <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>
                      ج/ لا يوجد، ولا تعرض نفسك للاحتيال!!!
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card-footer">
                <button className="btn btn-light-danger" data-kt-drawer-dismiss="true">إغلاق</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border-0 mb-10">
        <div className="card-body py-10">
          <h3 className="text-center text-info fw-bold mb-8">🚪 حالة المعابر</h3>
          <div className="row g-4 justify-content-center">
            <div className="col-md-4">
              <div className="card text-center bg-light-danger border-0 shadow-sm">
                <div className="card-body py-6">
                  <div className="fs-2 fw-bold text-danger">❌ مغلق</div>
                  <div className="fw-semibold mt-2">معبر رفح</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card text-center bg-light-warning border-0 shadow-sm">
                <div className="card-body py-6">
                  <div className="fs-2 fw-bold text-warning d-flex justify-content-center align-items-center gap-2">
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <span>يعمل بشكل جزئي</span>
                  </div>
                  <div className="fw-semibold mt-2">معبر كرم أبو سالم</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-5 mb-10">
        <div className="col-md-6">
          <div className="card text-center shadow-sm border-0 bg-primary text-white">
            <div className="card-body py-8">
              <div className="fs-1 fw-bold">22710</div>
              <div className="fs-5">اجمالي التحويلات</div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card text-center shadow-sm border-0 bg-success text-white">
            <div className="card-body py-8">
              <div className="fs-1 fw-bold">2407</div>
              <div className="fs-5">اجمالي السفر</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mb-5">
        <div className="card-body">
          <div id="dvmsg2" className="alert alert-dismissible bg-light-danger border border-danger border-dashed d-flex flex-center flex-sm-row w-100 p-5 mb-10">
            <div className="d-flex flex-column me-20">
              <label id="lblemployee" className="text-danger text-center fs-4 mb-5">ارشادات التحويلة</label>

              <li className="d-flex align-items-center fs-5 py-2">
                <span style={{ marginLeft: '10px' }} className="bullet bg-warning"></span>تبدأ التحويلة من الطبيب المعالج
              </li>
              <li className="d-flex align-items-center fs-5 py-2">
                <span style={{ marginLeft: '10px' }} className="bullet bg-primary"></span>التوجه لشباك الطباعة في نفس المستشفى
              </li>
              <li className="d-flex align-items-center fs-5 py-2">
                <span style={{ marginLeft: '10px' }} className="bullet bg-info"></span>لجنة التحويلات بوزارة الصحة
              </li>
              <li className="d-flex align-items-center fs-5 py-2">
                <span style={{ marginLeft: '10px' }} className="bullet bg-success"></span>منظمة الصحة العالمية (WHO)
              </li>
            </div>

            <div className="d-flex flex-column">
              <label id="lblemployee" className="text-danger text-center fs-4 mb-5">دلالات الحالة</label>

              <li className="d-flex align-items-center fs-5 py-2">
                <span style={{ marginLeft: '10px' }} className="bullet bg-warning"></span>تحت الاجراء .. في اللجنة
              </li>
              <li className="d-flex align-items-center fs-5 py-2">
                <span style={{ marginLeft: '10px' }} className="bullet bg-primary"></span>معتمدة .. تم ارسالها مكتب WHO، يتم التواصل معكم من طرف WHO
              </li>
              <li className="d-flex align-items-center fs-5 py-2">
                <span style={{ marginLeft: '10px' }} className="bullet bg-info"></span>متابعة محلية .. علاج محلي داخل قطاع غزة
              </li>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
