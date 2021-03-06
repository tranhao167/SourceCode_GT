USE [master]
GO
/****** Object:  Database [Fsoft_Task]    Script Date: 14/07/2020 1:22:26 CH ******/
CREATE DATABASE [Fsoft_Task]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Fsoft_Task', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\Fsoft_Task.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Fsoft_Task_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\Fsoft_Task_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Fsoft_Task] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Fsoft_Task].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Fsoft_Task] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Fsoft_Task] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Fsoft_Task] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Fsoft_Task] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Fsoft_Task] SET ARITHABORT OFF 
GO
ALTER DATABASE [Fsoft_Task] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Fsoft_Task] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Fsoft_Task] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Fsoft_Task] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Fsoft_Task] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Fsoft_Task] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Fsoft_Task] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Fsoft_Task] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Fsoft_Task] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Fsoft_Task] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Fsoft_Task] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Fsoft_Task] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Fsoft_Task] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Fsoft_Task] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Fsoft_Task] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Fsoft_Task] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Fsoft_Task] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Fsoft_Task] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Fsoft_Task] SET  MULTI_USER 
GO
ALTER DATABASE [Fsoft_Task] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Fsoft_Task] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Fsoft_Task] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Fsoft_Task] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [Fsoft_Task] SET DELAYED_DURABILITY = DISABLED 
GO
USE [Fsoft_Task]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 14/07/2020 1:22:26 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[AccName] [nvarchar](20) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[RoleID] [int] NOT NULL,
	[HasDeleted] [date] NULL,
	[Created] [date] NULL,
	[CreatedBy] [nvarchar](50) NULL,
	[Modified] [date] NULL,
	[ModifiedBy] [nvarchar](50) NULL,
 CONSTRAINT [PK_Account] PRIMARY KEY CLUSTERED 
(
	[AccName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Administrator]    Script Date: 14/07/2020 1:22:26 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Administrator](
	[AdminID] [int] IDENTITY(1,1) NOT NULL,
	[AdminName] [nvarchar](50) NOT NULL,
	[AccName] [nvarchar](20) NULL,
 CONSTRAINT [PK_Administrator] PRIMARY KEY CLUSTERED 
(
	[AdminID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Blog]    Script Date: 14/07/2020 1:22:26 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Blog](
	[BlogID] [int] IDENTITY(1,1) NOT NULL,
	[AdminID] [int] NOT NULL,
	[ImageMain] [nvarchar](max) NOT NULL,
	[Subject] [nvarchar](max) NOT NULL,
	[ContentBlog] [nvarchar](max) NOT NULL,
	[CreatedBy] [nvarchar](100) NULL,
	[Created] [date] NULL,
	[ModifiedBy] [nvarchar](100) NULL,
	[Modified] [date] NULL,
	[HasDeleted] [date] NULL,
	[Description] [nvarchar](max) NOT NULL,
	[Status] [nvarchar](50) NULL,
 CONSTRAINT [PK_Blog] PRIMARY KEY CLUSTERED 
(
	[BlogID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Candidate]    Script Date: 14/07/2020 1:22:26 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Candidate](
	[CandID] [int] IDENTITY(1,1) NOT NULL,
	[CandName] [nvarchar](50) NOT NULL,
	[CandPhone] [nvarchar](15) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[CandGender] [int] NOT NULL,
	[CandAddress] [nvarchar](100) NOT NULL,
	[CandBirthday] [date] NOT NULL,
	[Interest] [nvarchar](100) NULL,
	[AccName] [nvarchar](20) NULL,
	[Startday] [date] NULL,
	[Link] [nvarchar](200) NULL,
	[ReReason] [nvarchar](max) NULL,
	[HasDeleted] [date] NULL,
	[Status] [nvarchar](10) NULL,
	[Objective] [nvarchar](max) NULL,
	[CandMajor] [nvarchar](50) NULL,
	[Image] [nvarchar](max) NULL,
	[UpdateNew] [date] NULL,
	[UpdateTimes] [int] NULL,
	[HasRejected] [nvarchar](10) NULL,
 CONSTRAINT [PK_Candidate] PRIMARY KEY CLUSTERED 
(
	[CandID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Education]    Script Date: 14/07/2020 1:22:26 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Education](
	[EduID] [int] IDENTITY(1,1) NOT NULL,
	[Major] [nvarchar](30) NOT NULL,
	[School] [nvarchar](50) NOT NULL,
	[LevelEdu] [nvarchar](30) NOT NULL,
	[Startday] [date] NOT NULL,
	[Endday] [date] NOT NULL,
	[GPA] [float] NOT NULL,
	[CandID] [int] NOT NULL,
	[HasDeleted] [date] NULL,
 CONSTRAINT [PK_Education] PRIMARY KEY CLUSTERED 
(
	[EduID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Employer]    Script Date: 14/07/2020 1:22:26 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employer](
	[EmpID] [int] IDENTITY(1,1) NOT NULL,
	[EmpName] [nvarchar](80) NOT NULL,
	[EmpPhone] [nvarchar](20) NOT NULL,
	[EmpEmail] [nvarchar](50) NOT NULL,
	[AccName] [nvarchar](20) NULL,
	[HasDeleted] [date] NULL,
 CONSTRAINT [PK_Employer] PRIMARY KEY CLUSTERED 
(
	[EmpID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Role]    Script Date: 14/07/2020 1:22:26 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Role](
	[RoleID] [int] IDENTITY(1,1) NOT NULL,
	[RoleName] [nvarchar](50) NOT NULL,
	[HasDeleted] [date] NULL,
 CONSTRAINT [PK_Role] PRIMARY KEY CLUSTERED 
(
	[RoleID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Skills]    Script Date: 14/07/2020 1:22:26 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Skills](
	[SkillID] [int] IDENTITY(1,1) NOT NULL,
	[TypeSkill] [nvarchar](30) NOT NULL,
	[SkillName] [nvarchar](50) NOT NULL,
	[CandID] [int] NOT NULL,
	[HasDeleted] [date] NULL,
 CONSTRAINT [PK_Skills] PRIMARY KEY CLUSTERED 
(
	[SkillID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[WorkExperience]    Script Date: 14/07/2020 1:22:26 CH ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[WorkExperience](
	[ExpID] [int] IDENTITY(1,1) NOT NULL,
	[Position] [nvarchar](30) NOT NULL,
	[WorkPlace] [nvarchar](50) NOT NULL,
	[WorkTime] [nvarchar](50) NOT NULL,
	[CandID] [int] NOT NULL,
	[HasDeleted] [date] NULL,
 CONSTRAINT [PK_WorkExperience] PRIMARY KEY CLUSTERED 
(
	[ExpID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N' neuer1', N'E10ADC3949BA59ABBE56E057F20F883E', 1, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'AlexNesta133', N'nesta13', 1, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'duyen1908', N'E10ADC3949BA59ABBE56E057F20F883E', 3, NULL, CAST(N'2020-07-02' AS Date), N'Phan Anh Duyen', NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'evantran167', N'E10ADC3949BA59ABBE56E057F20F883E', 3, NULL, CAST(N'2020-07-02' AS Date), N'Tran Hao', NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'giau123456', N'E10ADC3949BA59ABBE56E057F20F883E', 3, NULL, CAST(N'2020-07-04' AS Date), N'Tran Minh Giau', NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'hieu123', N'E10ADC3949BA59ABBE56E057F20F883E', 3, NULL, CAST(N'2020-07-04' AS Date), N'Tran Trung Hieu', NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'kevin123', N'E10ADC3949BA59ABBE56E057F20F883E', 2, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'nghia123', N'E10ADC3949BA59ABBE56E057F20F883E', 3, NULL, CAST(N'2020-07-04' AS Date), N'Pham Huu Nghia', NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'ozil10', N'E10ADC3949BA59ABBE56E057F20F883E', 1, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'tan123456', N'E10ADC3949BA59ABBE56E057F20F883E', 3, NULL, CAST(N'2020-07-02' AS Date), N'Nguyễn Đình Nhật Tân', NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'vythao123', N'E10ADC3949BA59ABBE56E057F20F883E', 3, NULL, CAST(N'2020-07-02' AS Date), N'Vy Ngọc Phương Thảo', NULL, NULL)
INSERT [dbo].[Account] ([AccName], [Password], [RoleID], [HasDeleted], [Created], [CreatedBy], [Modified], [ModifiedBy]) VALUES (N'wich123', N'E10ADC3949BA59ABBE56E057F20F883E', 2, NULL, NULL, NULL, CAST(N'2020-07-03' AS Date), N'wich123')
SET IDENTITY_INSERT [dbo].[Administrator] ON 

INSERT [dbo].[Administrator] ([AdminID], [AdminName], [AccName]) VALUES (1, N'Neuer', N' neuer1')
INSERT [dbo].[Administrator] ([AdminID], [AdminName], [AccName]) VALUES (2, N'Ozil', N'ozil10')
SET IDENTITY_INSERT [dbo].[Administrator] OFF
SET IDENTITY_INSERT [dbo].[Blog] ON 

INSERT [dbo].[Blog] ([BlogID], [AdminID], [ImageMain], [Subject], [ContentBlog], [CreatedBy], [Created], [ModifiedBy], [Modified], [HasDeleted], [Description], [Status]) VALUES (1, 2, N'https://www.fpt-software.com/wp-content/uploads/sites/2/2018/03/covid-19-banner-v2-01.jpg', N'OUR RESPONSES TO COVID-19', N'<h2><strong>FPT Donates 2,000 Quarantine Rooms and Cash to Fight COVID-19</strong></h2><p>HANOI, Vietnam, March 23, 2020 /PRNewswire/ -- Vietnam''s largest tech firm, FPT, on Sunday announced it had dedicated its 2,000-room university dormitory as a quarantine site and US$850,000 in medical supplies to support the Government''s fight against coronavirus (COVID-19).</p><p>The dormitory is part of FPT University&nbsp;campus, located in a 300,000-square meter hi-tech park that is 40 minutes drive from the center of Hanoi. It is a four-building complex with lush greenery and many&nbsp;facilities&nbsp;available to accommodate thousands of students on campus.</p><p>Over the weekend, hundreds of FPT employees and students have gathered to vacate the rooms and help set up the quarantine facility. Besides accommodations, the company also donated to the local Government US$850,000 worth of medical supplies such as ventilators, disinfection chambers, and medical protective equipment. The&nbsp;dorm-turned-quarantine site is expected to be active from 23 March until the pandemic is over.</p><p>"People is our most valuable assets, and we are doing our best to help the Government fight against COVID-19. FPT wishes to contribute to the protection of front-line doctors, healthcare staff and the community, preventing the spread of the pandemic as well as easing pressures on the Government and local authorities. We hope to see more hands join the battle so we could get through this challenging time together," said FPT Chairman, Truong Gia Binh.</p><p>Earlier in February, FPT helped Vietnam''s Ministry of Health to launch a 24/7 virtual chatbot that could handle 5,000 inquiries on COVID-19 every day. The company has also granted&nbsp;free access to its AI-powered online learning platform VioEdu, where&nbsp;local students of all levels could educate themselves during the school closures.</p><p>As of Monday noon, Vietnam confirmed 118 positive cases of COVID-19, with no deaths. The country is gearing up to expand centralized quarantine sites nationwide to welcome citizens returning home&nbsp;from virus-hit countries. The Vietnamese Government has won praises from the World Health Organization for an effective operating response system and ability to address urgent public health issues.</p>', NULL, NULL, N'ozil10', CAST(N'2020-07-04' AS Date), NULL, N'While the Coronavirus (COVID-19) pandemic has shaken our world in an unprecedented way, we are in this together. FPT Software is committed to ensuring the health and safety of our employees, customers and partners, as well as our business continuity.', N'In Carousel')
INSERT [dbo].[Blog] ([BlogID], [AdminID], [ImageMain], [Subject], [ContentBlog], [CreatedBy], [Created], [ModifiedBy], [Modified], [HasDeleted], [Description], [Status]) VALUES (2, 2, N'https://www.fpt-software.com/wp-content/uploads/sites/2/2018/03/AI@2x_optimized.jpg', N'Artificial Intelligence', N'<p>Founded in 1999 as a FPT Group company, FPT Software has become the largest digital transformation and software services provider in Southeast Asia with more than 15,000 people working in 37 offices in 16 countries.&nbsp;<br><br>FPT Software is a Global Software Company built from the ambition of 13 Vietnamese children with the mission of bringing Vietnam''s intelligence to the world and changing people''s lives with technology.</p>', NULL, NULL, N'ozil10', CAST(N'2020-07-04' AS Date), NULL, N'A comprehensive software system trusted by 100+ Big hospitals and Clinics to manage all activities from the point of patient registration to discharge from the facility.', N'In Carousel')
INSERT [dbo].[Blog] ([BlogID], [AdminID], [ImageMain], [Subject], [ContentBlog], [CreatedBy], [Created], [ModifiedBy], [Modified], [HasDeleted], [Description], [Status]) VALUES (4, 2, N'https://career.fpt-software.com/wp-content/uploads/2020/05/cr-global.png', N'Global Presence 2020', N'<h2>We believe that life lessons from the most valuable and novel technology projects for global leading clients are FPT Software ‘s specialty. Experience Continuous Development and Go Global with us.</h2>', N'Neuer', CAST(N'2020-06-22' AS Date), N'ozil10', CAST(N'2020-06-25' AS Date), NULL, N'We are present in 25 countries with 52 offices, and we won''t stop there! Join our mission to become a world-class IT company in 2024.aaaaaaaaaaaaaaaaaaaaa', N'Not In Carousel')
INSERT [dbo].[Blog] ([BlogID], [AdminID], [ImageMain], [Subject], [ContentBlog], [CreatedBy], [Created], [ModifiedBy], [Modified], [HasDeleted], [Description], [Status]) VALUES (7, 2, N'http://res.cloudinary.com/boywaygl/image/upload/v1593143638/vjx8jhveqrh8cmxb6ymr.jpg', N'AUTOMOTIVE', N'<h2><strong>For nearly a decade</strong></h2><p>FPT has been offering numerous services and solutions to the world’s top automakers, OEMs, Tier-1 suppliers, and semiconductors in the industry. We leverage forefront innovations and provide engineering services to customers in multiple projects, ranging from In-Vehicle Infotainment, CAD/CAE, Connectivity to Middleware, Embedded Application.</p><p>By utilizing extensive experience and accumulated know-how and employing a large pool of talents including 4,400 automotive experts and engineers, FPT implements solutions with processes and quality in accordance with AUTOSAR, Automotive SPICE Level 3, and other global standards.</p><h2><strong>What We Offer</strong></h2><p>FPT provides global customers with innovative solutions to solve their business puzzles<br>&nbsp;</p>', N'ozil10', CAST(N'2020-06-25' AS Date), N'ozil10', CAST(N'2020-06-26' AS Date), NULL, N'Following A-Spice Level 3, we leverage forefront innovations and provide engineering services to customers in multiple industry-specific projects, ranging from HMI, middleware to  driver and hardware layers.', N'In Carousel')
SET IDENTITY_INSERT [dbo].[Blog] OFF
SET IDENTITY_INSERT [dbo].[Candidate] ON 

INSERT [dbo].[Candidate] ([CandID], [CandName], [CandPhone], [Email], [CandGender], [CandAddress], [CandBirthday], [Interest], [AccName], [Startday], [Link], [ReReason], [HasDeleted], [Status], [Objective], [CandMajor], [Image], [UpdateNew], [UpdateTimes], [HasRejected]) VALUES (1026, N'Tran Hao', N'0938910451', N'evantran167217@gmail.com', 1, N'HCM', CAST(N'1998-07-16' AS Date), N'Soccer, Guitar, Sing, ', N'evantran167', CAST(N'2020-07-02' AS Date), NULL, NULL, NULL, N'Approved', N'I want have a good Job and Salary up to 1000$', N'Coder ReactJS', N'http://res.cloudinary.com/boywaygl/image/upload/v1593668716/zn1qmp9ywwxgmxhvkfnq.jpg', NULL, 0, NULL)
INSERT [dbo].[Candidate] ([CandID], [CandName], [CandPhone], [Email], [CandGender], [CandAddress], [CandBirthday], [Interest], [AccName], [Startday], [Link], [ReReason], [HasDeleted], [Status], [Objective], [CandMajor], [Image], [UpdateNew], [UpdateTimes], [HasRejected]) VALUES (1027, N'Phan Anh Duyen', N'0784456789', N'paduyen11@gmail.com', 2, N'Go Vap', CAST(N'2001-08-19' AS Date), NULL, N'duyen1908', CAST(N'2020-07-02' AS Date), N'google.com/213156132145', N'You still haven''t condition to apply', NULL, N'Rejected', NULL, N'Tester', N'http://res.cloudinary.com/boywaygl/image/upload/v1593669431/xqhq16s6wpx6ht4mkb6k.jpg', CAST(N'2020-07-02' AS Date), 2, NULL)
INSERT [dbo].[Candidate] ([CandID], [CandName], [CandPhone], [Email], [CandGender], [CandAddress], [CandBirthday], [Interest], [AccName], [Startday], [Link], [ReReason], [HasDeleted], [Status], [Objective], [CandMajor], [Image], [UpdateNew], [UpdateTimes], [HasRejected]) VALUES (1028, N'Nguyễn Đình Nhật Tân', N'0987456789', N'nhattan123@gmail.com', 1, N'Tân Phú', CAST(N'1998-03-12' AS Date), N'Football, Games', N'tan123456', CAST(N'2020-07-02' AS Date), NULL, N'Test successful!', NULL, N'Rejected', N'Have A good job and the more salary', N'Tester', N'http://res.cloudinary.com/boywaygl/image/upload/v1593675340/ssmljn25qlk6g37vcv2c.jpg', CAST(N'2020-07-02' AS Date), 1, N'Yes')
INSERT [dbo].[Candidate] ([CandID], [CandName], [CandPhone], [Email], [CandGender], [CandAddress], [CandBirthday], [Interest], [AccName], [Startday], [Link], [ReReason], [HasDeleted], [Status], [Objective], [CandMajor], [Image], [UpdateNew], [UpdateTimes], [HasRejected]) VALUES (1029, N'Vy Ngọc Phương Thảo', N'0798456789', N'vythao123@gmail.com', 2, N'Gò Vấp', CAST(N'1998-08-01' AS Date), NULL, N'vythao123', CAST(N'2020-07-02' AS Date), N'âcscas', N'Test successful!', NULL, N'Rejected', NULL, N'BA', N'http://res.cloudinary.com/boywaygl/image/upload/v1593679650/cl9hiv4j4xjgck3dkask.jpg', NULL, 0, N'Yes')
INSERT [dbo].[Candidate] ([CandID], [CandName], [CandPhone], [Email], [CandGender], [CandAddress], [CandBirthday], [Interest], [AccName], [Startday], [Link], [ReReason], [HasDeleted], [Status], [Objective], [CandMajor], [Image], [UpdateNew], [UpdateTimes], [HasRejected]) VALUES (1030, N'Tran Minh Giau', N'04578754645', N'minhgiau123@gmail.com', 1, N'HCMCity', CAST(N'1998-06-01' AS Date), NULL, N'giau123456', CAST(N'2020-07-04' AS Date), N'https://www.timviecnhanh.com/', NULL, NULL, NULL, NULL, N'Tester', N'http://res.cloudinary.com/boywaygl/image/upload/v1593826126/pavg4n4kw7obnjlhghes.jpg', NULL, 0, NULL)
INSERT [dbo].[Candidate] ([CandID], [CandName], [CandPhone], [Email], [CandGender], [CandAddress], [CandBirthday], [Interest], [AccName], [Startday], [Link], [ReReason], [HasDeleted], [Status], [Objective], [CandMajor], [Image], [UpdateNew], [UpdateTimes], [HasRejected]) VALUES (1031, N'Pham Huu Nghia', N'0156486484', N'c10huunghia@gmail.com', 1, N'HCMCity', CAST(N'1998-04-22' AS Date), N'Comic', N'nghia123', CAST(N'2020-07-04' AS Date), NULL, NULL, NULL, NULL, N'Have good job', N'Tester', N'http://res.cloudinary.com/boywaygl/image/upload/v1593826394/wxjd7or9mlgohxigv9p6.webp', NULL, 0, NULL)
INSERT [dbo].[Candidate] ([CandID], [CandName], [CandPhone], [Email], [CandGender], [CandAddress], [CandBirthday], [Interest], [AccName], [Startday], [Link], [ReReason], [HasDeleted], [Status], [Objective], [CandMajor], [Image], [UpdateNew], [UpdateTimes], [HasRejected]) VALUES (1032, N'Tran Trung Hieu', N'0987447558', N'trunghieu123@gmail.com', 1, N'HCMCity', CAST(N'1998-04-01' AS Date), N'games,football', N'hieu123', CAST(N'2020-07-04' AS Date), NULL, NULL, NULL, NULL, N'Have good job', N'Tester', N'http://res.cloudinary.com/boywaygl/image/upload/v1593831965/kd63jc9brrn4qdrveev8.jpg', NULL, 0, NULL)
SET IDENTITY_INSERT [dbo].[Candidate] OFF
SET IDENTITY_INSERT [dbo].[Education] ON 

INSERT [dbo].[Education] ([EduID], [Major], [School], [LevelEdu], [Startday], [Endday], [GPA], [CandID], [HasDeleted]) VALUES (3036, N'Software Engineer', N'IUH', N'University', CAST(N'2016-08-01' AS Date), CAST(N'2020-08-01' AS Date), 3, 1026, NULL)
INSERT [dbo].[Education] ([EduID], [Major], [School], [LevelEdu], [Startday], [Endday], [GPA], [CandID], [HasDeleted]) VALUES (3037, N'PhotoShop', N'FPT Polytechnic', N'Colleges', CAST(N'2016-08-01' AS Date), CAST(N'2020-08-01' AS Date), 2, 1028, NULL)
INSERT [dbo].[Education] ([EduID], [Major], [School], [LevelEdu], [Startday], [Endday], [GPA], [CandID], [HasDeleted]) VALUES (3038, N'Software Engineer', N'IUH', N'University', CAST(N'2016-08-01' AS Date), CAST(N'2016-08-01' AS Date), 2, 1031, NULL)
INSERT [dbo].[Education] ([EduID], [Major], [School], [LevelEdu], [Startday], [Endday], [GPA], [CandID], [HasDeleted]) VALUES (3039, N'Software Engineer', N'IUH', N'University', CAST(N'2016-08-01' AS Date), CAST(N'2020-08-01' AS Date), 3, 1032, NULL)
SET IDENTITY_INSERT [dbo].[Education] OFF
SET IDENTITY_INSERT [dbo].[Employer] ON 

INSERT [dbo].[Employer] ([EmpID], [EmpName], [EmpPhone], [EmpEmail], [AccName], [HasDeleted]) VALUES (1, N'Alessandro Nesta', N'0789478554', N'nesta147@gmail.com', N'AlexNesta133', CAST(N'2020-05-24' AS Date))
INSERT [dbo].[Employer] ([EmpID], [EmpName], [EmpPhone], [EmpEmail], [AccName], [HasDeleted]) VALUES (1033, N'Wich', N'0485789456', N'wich123@gmail.com', N'wich123', NULL)
SET IDENTITY_INSERT [dbo].[Employer] OFF
SET IDENTITY_INSERT [dbo].[Role] ON 

INSERT [dbo].[Role] ([RoleID], [RoleName], [HasDeleted]) VALUES (1, N'Admin', NULL)
INSERT [dbo].[Role] ([RoleID], [RoleName], [HasDeleted]) VALUES (2, N'Employer', NULL)
INSERT [dbo].[Role] ([RoleID], [RoleName], [HasDeleted]) VALUES (3, N'Candidate', NULL)
SET IDENTITY_INSERT [dbo].[Role] OFF
SET IDENTITY_INSERT [dbo].[Skills] ON 

INSERT [dbo].[Skills] ([SkillID], [TypeSkill], [SkillName], [CandID], [HasDeleted]) VALUES (3029, N'Front-end', N'ReactJS', 1026, NULL)
INSERT [dbo].[Skills] ([SkillID], [TypeSkill], [SkillName], [CandID], [HasDeleted]) VALUES (3030, N'Back-end', N'Web Api .NET', 1026, NULL)
INSERT [dbo].[Skills] ([SkillID], [TypeSkill], [SkillName], [CandID], [HasDeleted]) VALUES (3031, N'UI', N'PhotoShop', 1028, NULL)
INSERT [dbo].[Skills] ([SkillID], [TypeSkill], [SkillName], [CandID], [HasDeleted]) VALUES (3032, N'Testing', N'Unit Test', 1031, NULL)
INSERT [dbo].[Skills] ([SkillID], [TypeSkill], [SkillName], [CandID], [HasDeleted]) VALUES (3033, N'Front-end', N'ASP. NET MVC 5', 1032, NULL)
SET IDENTITY_INSERT [dbo].[Skills] OFF
SET IDENTITY_INSERT [dbo].[WorkExperience] ON 

INSERT [dbo].[WorkExperience] ([ExpID], [Position], [WorkPlace], [WorkTime], [CandID], [HasDeleted]) VALUES (3021, N'Internship', N'Fsoft', N'3 months', 1026, NULL)
INSERT [dbo].[WorkExperience] ([ExpID], [Position], [WorkPlace], [WorkTime], [CandID], [HasDeleted]) VALUES (3022, N'PhotoShop', N'FPT Polytechnic ', N'3 months', 1028, NULL)
INSERT [dbo].[WorkExperience] ([ExpID], [Position], [WorkPlace], [WorkTime], [CandID], [HasDeleted]) VALUES (3023, N'Internship', N'Fsoft', N'3 months', 1031, NULL)
INSERT [dbo].[WorkExperience] ([ExpID], [Position], [WorkPlace], [WorkTime], [CandID], [HasDeleted]) VALUES (3024, N'Internship', N'Fsoft', N'3 months', 1032, NULL)
SET IDENTITY_INSERT [dbo].[WorkExperience] OFF
ALTER TABLE [dbo].[Account]  WITH CHECK ADD  CONSTRAINT [FK_Account_Role] FOREIGN KEY([RoleID])
REFERENCES [dbo].[Role] ([RoleID])
GO
ALTER TABLE [dbo].[Account] CHECK CONSTRAINT [FK_Account_Role]
GO
ALTER TABLE [dbo].[Administrator]  WITH CHECK ADD  CONSTRAINT [FK_Administrator_Account] FOREIGN KEY([AccName])
REFERENCES [dbo].[Account] ([AccName])
GO
ALTER TABLE [dbo].[Administrator] CHECK CONSTRAINT [FK_Administrator_Account]
GO
ALTER TABLE [dbo].[Blog]  WITH CHECK ADD  CONSTRAINT [FK_Blog_Administrator] FOREIGN KEY([AdminID])
REFERENCES [dbo].[Administrator] ([AdminID])
GO
ALTER TABLE [dbo].[Blog] CHECK CONSTRAINT [FK_Blog_Administrator]
GO
ALTER TABLE [dbo].[Candidate]  WITH CHECK ADD  CONSTRAINT [FK_Candidate_Account] FOREIGN KEY([AccName])
REFERENCES [dbo].[Account] ([AccName])
GO
ALTER TABLE [dbo].[Candidate] CHECK CONSTRAINT [FK_Candidate_Account]
GO
ALTER TABLE [dbo].[Education]  WITH CHECK ADD  CONSTRAINT [FK_Education_Candidate] FOREIGN KEY([CandID])
REFERENCES [dbo].[Candidate] ([CandID])
GO
ALTER TABLE [dbo].[Education] CHECK CONSTRAINT [FK_Education_Candidate]
GO
ALTER TABLE [dbo].[Employer]  WITH CHECK ADD  CONSTRAINT [FK_Employer_Account] FOREIGN KEY([AccName])
REFERENCES [dbo].[Account] ([AccName])
GO
ALTER TABLE [dbo].[Employer] CHECK CONSTRAINT [FK_Employer_Account]
GO
ALTER TABLE [dbo].[Skills]  WITH CHECK ADD  CONSTRAINT [FK_Skills_Candidate] FOREIGN KEY([CandID])
REFERENCES [dbo].[Candidate] ([CandID])
GO
ALTER TABLE [dbo].[Skills] CHECK CONSTRAINT [FK_Skills_Candidate]
GO
ALTER TABLE [dbo].[WorkExperience]  WITH CHECK ADD  CONSTRAINT [FK_WorkExperience_Candidate] FOREIGN KEY([CandID])
REFERENCES [dbo].[Candidate] ([CandID])
GO
ALTER TABLE [dbo].[WorkExperience] CHECK CONSTRAINT [FK_WorkExperience_Candidate]
GO
USE [master]
GO
ALTER DATABASE [Fsoft_Task] SET  READ_WRITE 
GO
