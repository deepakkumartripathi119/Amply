<div className="dashboard-conatainer">
        <Sidebar userData={e.userData} />
        <div className="centre-dashboard-div">
          <CentrePage
            userData={e.userData}
            popupEarn={popupEarn}
            popupSell={popupSell}
            popupBuy={popupBuy}
            userCCT={availableCredits}
            deviceRegistered={deviceRegistered}
          />
          <TransactionsTable
            userData={e.userData}
            transactions={transactions}
            verify={handleVerify}
            buyOrder={buyOrder}
            account={account}
            popupDelete={popupDelete}
            deleteOrder={deleteOrder}
          />
        </div>
        <RightSidebar
          userData={e.userData}
          connectedToMetamask={connectedToMetamask}
        />
      </div>
