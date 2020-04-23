const

; control type classes
CT_Button = "Button",
CT_ListView = "SysListView32",
CT_Static = "Static",
CT_Tab="SysTabControl32",
CT_ToolBar = "ToolbarWindow32",

; window classes and their ids
MainWindowClass = "#32770",
ConnectionInfoID = 1177,
DownloadProgressClass = "msctls_progress32",
DownloadProgressID = 0,
DownloadStatusHeaderId = 1299,
DownloadStatusID = 1030,
DownloadWindowID = 1146,
DownloadingSpeedID = 1151,
FileDownloadedID = 1147,
FileSizeID = 1154,
FilesListID = 1002,
TimeLeftID = 1149,
ResumeCapabilityID = 1175,
PauseStartButtonID = 1158,
SaveToEditID = 1759,
TabListID=12320,
ToolBarListID = 59392,
UrlID = 1156,

; Status strings
StatusComplete="Download complete, appending all downloaded parts into one file...",
StatusDownloading="Receiving data...",
StatusNO = "No",
StatusRefreshing = "Downloading owner web page to refresh link address",
StatusUnknown = "(unknown)"

; object state codes

Messages
@MSGTimeLeftL
%1 %2 %3
@@
@MSGTimeLeftS
%1, %3
@@
EndMessages

Globals
Collection DownloadWindows,
Handle MainWin,
Handle TWin,

; to make sure that status text is not spoken twice.
String GSOldText,

; variables that will hold information that changes less frequently.
String Resume,
String Size,
String Url,

; to deal with controls that are inaccessible from keyboard,
; I'll make global arrays that will be created in autostart event.
; Those arrays will contain classes and ids of controlls.
;Those Control information would be used to navigate among other controls.

; Variables that will hold information about listview columns and rows.
Int GICurrentRowindex,
Int GICurrentColIndex,
String GSCurrentHeader,
Handle GHDownloadsList,

; variables for OCR
	Int GlobalOCRJobID, ; Copied from Default
	int globalDocumentOCR,
	
	; a bool var to announce whether Focus change will anounce current row
	Int GIAnnounceCurrentRow,
	
	; an int variable to store schedual function ID that will set focus
	Int GISfId
	