<form onSubmit={handleSubmit} className="form">
   
      <div className="mb-5  inp  ">
        <label
          for="default-input"
          class="block mb-2 containetinput  font-medium text-gray-900 dark:text-white"
        >
          الاسم
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="name"
          type="text"
          id="default-input"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-5">
        <label
          for="default-input"
          class="block mb-2  containetinput text-gray-900 dark:text-white  rtl:"
        >
          العنوان
        </label>
        <input
          value={number}
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          id="default-input"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg   block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="mb-5">
        <label
          for="default-input"
          class="block mb-2  containetinput text-gray-900 dark:text-white"
        >
          رقم الهاتف
        </label>
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="text"
          id="default-input"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="flex items-center mb-4">
        <input
          id="default-checkbox"
          type="checkbox"
          checked={discountEnabled}
          onChange={(e) => setDiscountEnabled(e.target.checked)}
          value=""
          class="w-4 h-4 0 dark:focus:ring-orange-600 dark:ring-offset-gray-800   dark:border-gray-600"
        />
        <label
          for="default-checkbox"
          class="mr-2  font-medium text-gray-900 dark:text-gray-300"
        >
          {" "}
          لدي كود الخصم
        </label>
      </div>

      <div className="mb-5">
        <label
          for="discount-input"
          className="block mb-2 containetinput text-gray-900 dark:text-white"
        >
          كود الخصم
        </label>
        <div
          className={`relative discontinput ${
            discountEnabled ? "" : "opacity-70"
          }`}
        >
          <input
            value={discountCode}
            onChange={handleDiscountCodeChange}
            type="text"
            id="discount-input"
            disabled={!discountEnabled} // Add the disabled attribute based on discountEnabled state
            className={`block w-full p-4 ${
              discountEnabled ? "" : "cursor-not-allowed"
            }
                
              } bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
              `}
          />

          <button
            onClick={applyDiscountCode}
            type="button"
            className="text-white check absolute left-2.5 bottom-2 focus:ring-2 z-30 focus:ring-blue-300 font-medium rounded-lg text-md px-4 py-2 dark:focus:ring-orange-400"
          >
            تاكيد
          </button>
          <div className="text-white checkprice absolute left-16 bottom-2.5  z-10  font-medium rounded-md text-sm px-4 py-1.5">
            <p className="">{prices} الف</p>
          </div>
        </div>
      </div>

      {/* <input
     type="text"
   
     placeholder="Name"
     required
   />
   <input
     type="text"
   
     placeholder="Location"
     required
   />
   <input
     type="tel"

     placeholder="Number"
     required
   />
   <input
     type="text"
   
     placeholder="Discount Code"
     required
   /> */}
      {/* <button type="button" >
     Apply Code
   </button> */}
      <div className={"homebtngroup"}>
        <button
          type="submit"
          className={"btnbtnprimary"}
          data-aos="zoom-in"
          data-aos-duration="1400"
        >
          <p className={"btntext3"}> شراء </p>
          <span className={"square"}></span>
        </button>
        {/* <Link href="/aboutus">
               <button onClick={"handleButton1Click"}
                 className={"btnbtnsecondary"}
                 data-aos="zoom-in"
                 data-aos-duration="1400"
               >
                 <p className={"btntext"}>Discover your current vision</p>
                 <span className={"square"}></span>
               </button>
             </Link> */}
      </div>
      {/* <button type="submit" className='btntext3'>طلب الان</button> */}
    </form>