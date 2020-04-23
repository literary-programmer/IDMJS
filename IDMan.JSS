; jaws scripts for internet download manager.
; written by Hamza ahmad<office.hamzaahmad@gmail.com>

include "hjConst.jsh"
include "HJGlobal.jsh"
include "idman.jsh"
include "Common.jsm"

String Function GetSelectionState ()
	var
	Int ISetting = StringToInt (GetStringOptionDefaultSetting ("Options", "IndicateSelected")),
	String SSelection = GetObjectState (true, 0),
	Int ISelected = true
	
	If (StringLength (SSelection) == 0)
		SSelection = "Not Selected"
		ISelected = false
	EndIf
	
	If (ISetting == 1
		&& ISelected == true)
		Return SSelection
	ElIf (ISetting == 2
		&& ISelected == false)
		Return SSelection
	ElIf (ISetting == 3)
		Return SSelection
	Else
		Return ""
	EndIf
EndFunction

String Function GetFileSavedPath ()
	var
	String SPath = ""
	
	If (GHDownloadsList == GlobalFocusWindow
		&& GICurrentRowindex > 0
		&& lvGetItemText (GHDownloadsList, GICurrentRowindex, 5) == "Complete")
		SPath = lvGetItemText (GHDownloadsList, GICurrentRowindex, 10)
		If (StringLeft (SPath, 9) == "Downloads")
			SPath = FormatString ("%1\\%2", GetEnvironmentVariable ("userprofile"), SPath)
		EndIf
	EndIf
	return SPath
EndFunction

Int Function InDownloadsList (Optional Int FocusIndex)
	var
	Handle FocusWindow = GlobalFocusWindow
	
	If (FocusWindow == 0)
		FocusWindow = GetFocus ()
	EndIf
	
	If (GetWindowClass (FocusWindow) == CT_ListView
		&& GetControlID (FocusWindow) == FilesListID
		&& IsPCCursor ()
		&& !UserBufferIsActive ()
		&& MenusActive () == INACTIVE)
		GHDownloadsList = GlobalFocusWindow
		
		If (GICurrentRowIndex <= 0)
			GICurrentRowindex = lvGetFocusItem (GHDownloadsList)
		EndIf
		
		If (GICurrentColIndex == 0)
			GICurrentColIndex = 1
		EndIf
		return True
	EndIf
	Return False
EndFunction

Void Function SetColumn (Int Index, Optional Int ShouldntSpeak)
	GICurrentColIndex = Index
	GSCurrentHeader = lvGetColumnHeader (GHDownloadsList, GICurrentColIndex)
	If (ShouldntSpeak)
		Return
	EndIf
	ReportCurrentRow (True)
EndFunction

Void Function ReportCurrentRow (Optional Int ShouldntSpeakName, Optional Int IAnnouncePosition, Optional Int IAddRow)
	var
	Int ICurrentRowIndex = GICurrentRowIndex
	
	If (IAddRow == True)
		GIAnnounceCurrentRow = false
	EndIf
	
	If (GICurrentColIndex == 1
		|| !ShouldntSpeakName)
		var
		String SSelection = GetSelectionState()
		
		SayFormattedMessage (OT_Message, "%1 %2", "", SSelection, lvGetItemText (GHDownloadsList, ICurrentRowindex, 1))
	EndIf
	If (GICurrentColIndex > 1)
		SayMessage (OT_Message, GSCurrentHeader, "")
		SayMessage (OT_Message, lvGetItemText (GHDownloadsList, ICurrentRowindex, GICurrentColIndex), "")
	EndIF
	If (GICurrentColIndex > 1
		|| IAnnouncePosition == true)
		SayFormattedMessage (OT_Position, "%1 of %2", "", IntToString (GICurrentRowindex), IntToString (lvGetItemCount (GHDownloadsList)))
	EndIf
EndFunction

Void Function AutostartEvent ()
	DownloadWindows = new Collection
	TWin = GetTopLevelWindow (GetAppMainWindow (GetCurrentWindow ()))
	;MainWin = GetAppMainWindow (GetTopLevelWindow ())
	Resume = ""
	Size = ""
	Url = ""
	GIAnnounceCurrentRow = true
EndFunction

Void Function MonitorNewTextEventAlerts (Handle HFocusWindow, Handle HTextWindow, String SNewText, Int IAttribute, Int IFGColor, Int IBGColor, Int IEchoSetting, String SFrame)
	If (GetControlID (HTextWindow) == DownloadStatusID
		&& GSOldText != SNewText)
		SayMessage (OT_Message, SNewText, "")
		GSOldText = SNewText
	else
		if (StringLength (SNewText) <= 4
			&& StringRight (SNewText, 1) == "%")
			SayString (GetWindowClass (HTextWindow))
		EndIF
	EndIf
EndFunction

Void Function NameChangedEvent (Handle HCurrWin, Int IIdNo, Int IIdChild, Int IType, String SName, String SOld)
	If (IsDownloadWindow ())
		
	Else
		Default::NameChangedEvent (HCurrWin, IIdNo, IIdChild, IType, SName, SOld)
	EndIf
EndFunction

Void Function FocusChangedEventEx (Handle HNewWin, Int INewNumObj, Int INewChildObj, Handle HOldWin, Int IOldNumObj, Int IOldChildObj, Int IDepth)
	If (InDownloadsList ()
		&& HNewWin == GHDownloadsList)
		If (GIAnnounceCurrentRow == true)
			GICurrentRowIndex = lvGetFocusItem (GHDownloadsList)
			ReportCurrentRow ()
		else
			GIAnnounceCurrentRow = True
		EndIf
	Else
		;IsInDownloadsWindow ()
		Default::FocusChangedEventEx (HNewWin, INewNumObj, INewChildObj, HOldWin, IOldNumObj, IOldChildObj, IDepth)
	EndIF
EndFunction

Void Function SayNonHighlightedText (handle HWin, String SText)
	;	SayString ("new: " + SText)
EndFunction

Void Function WindowDestroyedEvent (Handle HWin)
	var
	String SHandle = DecToHex (HWin)
	If (CollectionItemExists (DownloadWindows, SHandle))
		CollectionRemoveItem (DownloadWindows, SHandle)
	EndIf
	Default::WindowDestroyedEvent (HWin)
EndFunction



Void Function CopyText (string Text)
	if (StringLength (text)
		&& GetClipboardText () != text) then
		CopyToClipboard (text)
		SayMessage (OT_MESSAGE, "Copied to clipboard", "copied")
	else
		Beep ()
	EndIf
EndFunction

String Function GetDownloadStatus ()
	var
	Handle Win,
	String Message
	
	Win = GetAppMainWindow (GlobalFocusWindow)
	Message = GetWindowText (Win, True)
	Return Message
EndFunction

Handle Function GetWin (String SClass, Int IId)
	var
	Handle Win
	
	Win = FindWindowWithClassAndId (GetTopLevelWindow (GlobalFocusWindow), SClass, IId)
	If (!Win)
		return false
	else
		Return Win
	EndIf
EndFunction

Void Function InitDownloadWindow ()
	var
	Handle HTopWin = GetAppMainWindow (GlobalFocusWindow),
	String SHandle = DecToHex (HTopWin)
	If (!CollectionItemExists (DownloadWindows, SHandle))
		var
		Collection CDownloadWin
		CDownloadWin = new Collection
		DownloadWindows [SHandle] = CDownloadWin
	EndIf
EndFunction

Int Function IsDownloadWindow ()
	If (FindWindowWithClassAndId (GetTopLevelWindow (GetAppMainWindow (GetCurrentWindow ())), DownloadProgressClass, DownloadWindowID))
		InitDownloadWindow ()
		Return True
	EndIf
	Return False
EndFunction

String Function GetDownloadInfo (Int ControlID)
	var
	string info,
	Handle Win
	
	Win = GetWin (CT_Static, ControlID)
	info = GetWindowName (Win)
	If (StringLength (Info) < 5)
		Info = GetWindowText (Win, false)
	EndIf
	return info
EndFunction

String Function ProcessPercentage (String SMsg)
	var
	Int IPercentage = 0
	
	If (StringContainsChars (SMsg, "()"))
		IPercentage = StringToInt (SubString (StringSegment (SMsg, "(", 2), 2, 2))
	EndIf
	
	Return FormatString ("%1 percent", IntToString (IPercentage))
EndFunction

String Function ProcessResumeCapability (String SCapability)
	return SCapability
EndFunction

String Function ProcessTimeLeft (String STime)
	If (Stime == StatusUnknown)
		return STime
	EndIf
	
	var
	String SAnd = "",
	int IIndex = 1,
	String SStart,
	String SEnd,
	String SNumber,
	string SResult,
	int ISegments,
	String SPart1,
	String SPart2
	
	ISegments = StringSegmentCount (STime, " ")
	
	STime = StringReplaceSubstrings (STime, "(s)", "")
	
	While (IIndex <= 4)
		SStart = StringSegment (STime, " ", IIndex)
		SEnd = StringSegment (STime, " ", IIndex + 1)
		If (StringToInt (SStart) > 1)
			SNumber = "s"
		else
			SNumber = ""
		EndIf
		
		If (SEnd == "min")
			SEnd = "minute"
		ElIf (SEnd == "Sec")
			SEnd = "second"
		EndIF
		If (IIndex == 1)
			SPart1 = FormatString ("%1 %2%3", SStart, SEnd, SNumber)
		Else
			SPart2 = FormatString ("%1 %2%3", SStart, SEnd, SNumber)
		EndIF
		
		IIndex = IIndex + 2
	EndWhile
	
	If (StringLength (SPart2) > 1)
		SAnd = "and"
	EndIf
	
	If (GetVerbosity () == Intermediate)
		SResult = MSGTimeLeftL
	Else
		SResult = MSGTimeLeftS
	EndIF
	
	Return FormatString (SResult, SPart1, SAnd, SPart2)
EndFunction

Int Function SayDownloadInformation (string AboutString, int ControlID, int DoCopy, Optional String ProcessFunc)
	var
	string text,
	String Message
	
	if (IsDownloadWindow ()) then
		Text = GetDownloadInfo (ControlID)
		Message = Text
		
		If (StringLength (ProcessFunc))
			Message = CallFunctionByName (ProcessFunc, Message)
		EndIf
		
		If (DoCopy
			&& IsSameScript ()
			&& Text != StatusUnknown) then
			CopyText (text)
		else
			SayFormattedMessage (OT_MESSAGE, "%1\r\n%2", "%2", AboutString, Message)
		EndIf
		return true
	else
		;SayMessage (OT_ERROR, "Not in download window", "Not in download")
		ScriptCalled ()
	endIf
	return false
EndFunction

Void Function ScriptCalled ()
	SayCurrentScriptKeyLabel ()
	TypeCurrentScriptKey ()
EndFunction

Void Function SayConnectionInfo (Int LVINumber)
	if (IsDownloadWindow ())
		var
		Handle LView,
		String Text1,
		String Text2,
		String Text3
		
		LView = GetWin (CT_Listview, ConnectionInfoID)
		If (LView)
			If (lvGetItemCount (LView) >= LVINumber)
				Text1 = lvGetItemText (LView, LVINumber, 1)
				Text2 = lvGetItemText (LView, LVINumber, 2)
				Text3 = lvGetItemText (LView, LVINumber, 3)
				SayFormattedMessage (OT_Message, "%1. %2\r\n%3", "%2\r\n%3", Text1, Text2, Text3)
			EndIf
		EndIf
	Else
		ScriptCalled ()
	EndIf
EndFunction

Void Function SelectItem (Optional Int ICurrentRowIndex)
	If (ICurrentRowIndex == 0)
		ICurrentRowIndex = GICurrentRowIndex
	EndIf
	
	lvSetFocusItem (GHDownloadsList, ICurrentRowindex, True)
	lvSelectItem (GHDownloadsList, ICurrentRowIndex, True)
EndFunction

Script ClickToolBarItem ()
	var
	Handle TBar = FindWindowWithClassAndId (GetTopLevelWindow (GetAppMainWindow (GetCurrentWindow ())), CT_ToolBar, ToolBarListID),
	String ToolBarItems= "",
	Int TBItemCount,
	Int Index,
	Int SelectedOption
	
	if (TBar) Then
		TBItemCount = 12 ; GetItemCount (TBar)
		for Index = 1 to TBItemCount
			ToolBarItems = ToolBarItems + tbGetItemText (TBar, Index) + "|"
		EndFor
		ToolBarItems = StringLeft (ToolBarItems, StringLength (ToolBarItems) - 1)
		SelectedOption = DlgSelectItemInList (ToolBarItems, "Select Tool Bar Item to Click", true, 1)
		If (SelectedOption) Then
			ClickToolbarItemByIndex (TBar, SelectedOption)
		EndIf
	Else
		SayMessage (OT_MESSAGE, "You are not in downloads list", "Not in downloads list")
	EndIf
EndScript

Script Enter ()
	var
	String Path = GetFileSavedPath (),
	Int RunIt = true
	
	If (FileExists (Path))
		RunIt = false
		Run ("\"" + Path + "\"")
	EndIf
	
	If (RunIt)
		PerformScriptByName ("Enter")
	EndIf
EndScript

Script ScriptFilename ()
	ScriptAndAppNames ("Internet download manager")
EndScript

Script JAWSEnd ()
	If (InDownloadsList ())
		SetColumn (1, true)
	EndIf
	PerformScriptByName ("JAWSEnd")
EndScript

Script JAWSHome ()
	If (InDownloadsList ())
		SetColumn (1, true)
	EndIf
	PerformScriptByName ("JAWSHome")
EndScript

Script PauseStart ()
	if (IsDownloadWindow ()) then
		var
		Int ITop,
		Int IBottom,
		Int ILeft,
		Int IRight,
		handle ThatButton
		
		ThatButton = FindWindowWithClassAndId (GetTopLevelWindow (GetAppMainWindow (GetCurrentWindow ())), CT_Button, PauseStartButtonID)
		GetWindowRect (ThatButton, ILeft, IRight, ITop, IBottom)
		; ClickAtPoint (ITop + 2, ILeft + 2, false)
	else
		PerformScript SelectCurrentItem()
	EndIf
EndScript

Script SayConnection1 ()
	SayConnectionInfo (1)
EndScript

Script SayConnection2 ()
	SayConnectionInfo (2)
EndScript

Script SayConnection3 ()
	SayConnectionInfo (3)
EndScript

Script SayConnection4 ()
	SayConnectionInfo (4)
EndScript

Script SayConnection5 ()
	SayConnectionInfo (5)
EndScript

Script SayConnection6 ()
	SayConnectionInfo (6)
EndScript

Script SayConnection7 ()
	SayConnectionInfo (7)
EndScript

Script SayConnection8 ()
	SayConnectionInfo (8)
EndScript

Script SayConnection9 ()
	SayConnectionInfo (9)
EndScript

Script SayConnection10 ()
	SayConnectionInfo (10)
EndScript

Script SayDownloadedFile ()
	if (!SayDownloadInformation ("File downloaded", FileDownloadedID, false)) then
		ScriptCalled ()
	EndIf
EndScript

Script SayDownloadingSpeed ()
	if (!SayDownloadInformation ("Downloading Speed", DownloadingSpeedID, false)) then
		ScriptCalled ()
	EndIf
EndScript

Script SayDownloadStatus ()
	if (!SayDownloadInformation ("Downloading status", DownloadStatusID, false)) then
		ScriptCalled ()
	EndIf
EndScript

Script SayFileName ()
	if (IsDownloadWindow ())
		var
		Int IIndex = 0,
		String title
		Title = GetWindowTextEx (GetAppMainWindow (GetFocus ()), false, false)
		If (StringContains (Title, "% "))
			While (IIndex <= 4)
				IIndex = IIndex + 1
				If (SubString (Title, IIndex, 1) == " ")
					Title = StringRight (Title, StringLength (Title) - (IIndex))
					IIndex = 5
				EndIf
			EndWhile
		EndIf
		
		SayString (title)
	EndIf
EndScript

Script SayFileSize ()
	if (!SayDownloadInformation ("File size", FileSizeID, true)) then
		ScriptCalled ()
	EndIf
EndScript

Script SayNextCharacter ()
	If (InDownloadsList ())
		If (GICurrentColIndex < lvGetNumOfColumns (GHDownloadsList))
			SetColumn (GICurrentColIndex + 1)
		Else
			Beep ()
		EndIf
	Else
		PerformScriptByName ("SayNextCharacter")
	EndIf
EndScript

Script SayNextLine ()
	If (InDownloadsList ())
		If (GICurrentRowindex < lvGetItemCount (GHDownloadsList))
			GICurrentRowIndex = GICurrentRowIndex + 1
			ReportCurrentRow (false, false, true)
			
			If (IsSameScript ()
				&& GISfId >= 1)
				UnScheduleFunction (GISfId)
				GISfId = 0
			EndIf
			
			GISfId = ScheduleFunction ("SelectItem", 1, False)
		Else
			Beep ()
		EndIf
	Else
		PerformScriptByName ("SayNextLine")
	EndIf
EndScript

Script SayPercentage ()
	if (!SayDownloadInformation ("File downloaded", FileDownloadedID, false, "ProcessPercentage")) then
		ScriptCalled ()
	EndIf
EndScript

Script SayPriorCharacter ()
	If (InDownloadsList ())
		If (GICurrentColIndex > 1)
			SetColumn (GICurrentColIndex - 1)
		Else
			Beep ()
		EndIf
	Else
		PerformScriptByName ("SayPriorCharacter")
	EndIf
EndScript

Script SayPriorLine ()
	If (InDownloadsList ())
		If (GICurrentRowindex > 1)
			GICurrentRowIndex = GICurrentRowIndex - 1
			ReportCurrentRow (false, false, True)
			
			If (IsSameScript ()
				&& GISfId >= 1)
				UnScheduleFunction (GISfId)
				GISfId = 0
			EndIf
			
			GISfId = ScheduleFunction ("SelectItem", 1, False)
		Else
			Beep ()
		EndIf
	Else
		PerformScriptByName ("SayPriorLine")
	EndIf
EndScript

Script SayResumeCapability ()
	if (!SayDownloadInformation ("Resume capability", ResumeCapabilityID, false, "ProcessResumeCapability")) then
		ScriptCalled ()
	EndIf
EndScript

Script SayTimeLeft ()
	if (!SayDownloadInformation ("Time left", TimeLeftID, false, "ProcessTimeLeft")) then
		ScriptCalled ()
	EndIf
EndScript

Script tab ()
	if (GetControlID (GetFocus ()) == ConnectionInfoID) then
		SayString ("ok")
	Else
		PerformScript Tab()
	EndIf
EndScript

Script SayURL ()
	if (!SayDownloadInformation ("URL", UrlID, true)) then
		ScriptCalled ()
	EndIf
EndScript

Script SayWindowTitle ()
	if (IsDownloadWindow ()) then
		PerformScriptByName ("SayTopLineOfWindow")
	else
		PerformScriptByName ("SayWindowTitle")
	EndIf
EndScript

Script OCRSelectedFile ()
	var
	String FilePath = GetFileSavedPath (),
	int PrimaryLanguage = ReadSettingInteger (section_OCR, hKey_PrimaryRecognitionLanguage, 1033, FT_DEFAULT_JCF),
	int SecondaryLanguage = ReadSettingInteger (section_OCR, hKey_SecondaryRecognitionLanguage, 1033, FT_DEFAULT_JCF),
	int result = OCRResult_Success;
	if !(GetRunningFSProducts() & product_JAWS) then
		return
	endIf
	if CanRecognize () != OCR_SUCCESS then
		SayFormattedMessage (OT_ERROR, MSG_OCRNotInstalled_L, MSG_OCRNotInstalled_S)
		Return
	endIf
	If GlobalOCRJobID
		SayMessage (OT_JAWS_MESSAGE, MSG_OCRAlreadyInProgress_L, MSG_OCRAlreadyInProgress_S)
		Return
	EndIf
	result = RecognizeFile (FilePath, PrimaryLanguage, SecondaryLanguage, GlobalOCRJobID)
	if result == OCRResult_Success then
		SayMessage (OT_JAWS_MESSAGE, msg_OCRDocumentStarted_L, MSG_OCRStarted_S)
	ElIf result == OCRResult_NoFileSelected then
		SayFormattedMessage (OT_ERROR,  msgOCRNoFileSelected)
	ElIf result == OCRResult_MultipleFilesSelected then
		SayFormattedMessage (OT_ERROR,  msgOCRMultipleFilesSelected)
	ElIf result == OCRResult_UnsupportedFileSelected then
		SayFormattedMessage (OT_ERROR,  msgOCRUnsupportedFileSelected)
	else
		SayFormattedMessage (OT_ERROR,  MSG_OCR_PDF_FAILED_TO_Start)
	endIf
endScript

Script PictureSmartWithSelectedFile ()
	var
	int PrimaryLanguage = ReadSettingInteger (section_OCR, hKey_PrimaryRecognitionLanguage, 1033, FT_DEFAULT_JCF),
	int SecondaryLanguage = ReadSettingInteger (section_OCR, hKey_SecondaryRecognitionLanguage, 1033, FT_DEFAULT_JCF),
	int result = OCRResult_Success;
	if !(GetRunningFSProducts() & product_JAWS) then
		return
	endIf
	If GlobalOCRJobID
		SayMessage (OT_JAWS_MESSAGE, MSG_OCRAlreadyInProgress_L, MSG_OCRAlreadyInProgress_S)
		Return
	EndIf
	if !IsPictureSmartEnabled() then
		Return
	endif
	
	result = IsTelemetryEnabled(TRUE);
	If result == PSResult_DemoMode then
		sayMessage (OT_ERROR,  msg_picturesmart_demomode)
	elif result != PSResult_Success then
		; no message needed since the function prompts
		return
	EndIf
	
	result = DescribeSelectedFile (getFocus (), PrimaryLanguage, SecondaryLanguage, GlobalOCRJobID)
	If result == PSResult_DemoMode then
		sayMessage (OT_ERROR,  msg_picturesmart_demomode)
	ElIf result == PSResult_NoFileSelected then
		SayFormattedMessage (OT_ERROR,  msg_picturesmart_nofileselected)
	ElIf result == PSResult_MultipleFilesSelected then
		SayFormattedMessage (OT_ERROR,  msg_picturesmart_multiplefileselected)
	ElIf result == PSResult_UnsupportedFileSelected then
		SayFormattedMessage (OT_ERROR,  msg_picturesmart_unsupportedformat)
	elif result != PSResult_Success then
		SayFormattedMessage (OT_ERROR,  msg_picturesmart_failedtostart)
	endIf
endScript

Script Test ()
	;	SayInteger (CollectionItemCount (DownloadWindows))
	SayInteger (GlobalFocusWindow)
	SayString (GetFileSavedPath ())
EndScript
